import type { NextApiRequest, NextApiResponse } from 'next';
import { createApolloClient } from '@orca/graphql';
import { gql } from '@apollo/client';
import { ethers, BigNumber, utils } from 'ethers';
import {
  VaultTypes,
  VaultContracts,
  BankTokenInfo,
  FarmTokenInfo,
  ProtocolTokenInfo,
  DeployedContracts,
  ERC20__factory,
} from '@orca/shared';
import { getVault, getxORCA } from '@orca/web3';
import find from 'lodash/find';
import includes from 'lodash/includes';

const GET_TVL_INFO = gql`
  query BankInfoFrontPage @api(name: orca) {
    banks {
      id
      treasury
      totalDebt
      totalCollateral
      tokenPeg
      minimumCollateralPercentage
      token {
        symbol
        decimals
        price {
          priceUSD
        }
      }
    }
    exchanges {
      treasury
      usdHeld
    }
  }
`;

const GET_GNERAL_YIELD = gql`
  query GeneralYieldInfo($pair: Bytes!) @api(name: orca) {
    pools(where: { pair: $pair }) {
      id
      pair
      allocPoint
      totalStaked
      depositFee
      treasuryAmount
      leader {
        orcaPerSec
        totalAllocPoints
      }
    }
  }
`;

const GET_TOKEN_DATA = gql`
  query GetTokenData($id: ID!) @api(name: png) {
    pairs(first: 5, where: { id: $id }) {
      id
      reserveUSD
      totalSupply
    }
  }
`;

const GET_TOKEN_PRICE = gql`
  query GetTokenPrice($id: ID!) @api(name: png) {
    token(id: $id) {
      id
      derivedETH
      totalSupply
    }

    bundle(id: "1") {
      id
      ethPrice
    }
  }
`;
const client = createApolloClient();
const provider = new ethers.providers.JsonRpcProvider(
  'https://api.avax.network/ext/bc/C/rpc'
);

const yieldFarmData = async (farm: string) => {
  const { data: yieldData } = await client.query({
    query: GET_GNERAL_YIELD,
    variables: { pair: farm.toLowerCase() },
  });

  const { data: tokenData } = await client.query({
    query: GET_TOKEN_DATA,
    variables: { id: farm.toLowerCase() },
  });

  const { data: price } = await client.query({
    query: GET_TOKEN_PRICE,
    variables: {
      id: ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const totalStaked = Number(
    utils.formatEther(BigNumber.from(yieldData.pools[0]?.totalStaked || 0))
  );

  const avaxUSDPrice = Number(price.bundle?.ethPrice);
  const orcaUSDPrice = Number(price.token?.derivedETH) * avaxUSDPrice;

  const orca = ERC20__factory.connect(
    DeployedContracts.main.ORCA.address,
    provider
  );
  const leader = getxORCA(provider, 43114);
  const orcaBalance = await orca.balanceOf(leader.address);
  const xOrcaSupply = await leader.totalSupply();

  const xOrcaRatio =
    Number(utils.formatEther(orcaBalance)) /
    Number(utils.formatEther(xOrcaSupply));

  return farm.toLowerCase() ===
    FarmTokenInfo['XORCA'].address.mainnet.toLowerCase() ||
    farm.toLowerCase() === FarmTokenInfo['XORCA'].address.fuji.toLowerCase()
    ? totalStaked * orcaUSDPrice * xOrcaRatio
    : (totalStaked / tokenData.pairs[0].totalSupply) *
        tokenData.pairs[0].reserveUSD;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prices = (
    await Promise.all(
      VaultTypes.map(async (vaultType) => {
        const vault = getVault(vaultType.name, provider, 43114);
        if (vault) {
          const price = await vault.getPriceSource();
          const peg = await vault.getPricePeg();
          return { price, peg, symbol: vaultType.symbol, name: vaultType.name };
        }
      })
    )
  ).filter((n) => n);

  const bankExchangePoolData = await client.query({ query: GET_TVL_INFO });
  // Sort the banks
  const indivBanks = bankExchangePoolData.data.banks
    .filter((bank) => {
      return includes(VaultContracts.mainnet, bank.id.toLowerCase());
    })
    .map((bank) => {
      // Get the correct collateral type
      const collat = Object.keys(VaultContracts.mainnet).filter(
        (key) => VaultContracts.mainnet[key] === bank.id.toLowerCase()
      );

      const price = find(prices, { name: collat[0] });
      const name = bank.token.symbol.toLowerCase();
      const debt = BigNumber.from(bank.totalDebt);
      const collateral = BigNumber.from(bank.totalCollateral)
        .mul(10 ** (18 - bank.token.decimals))
        .mul(price.price)
        .div(BigNumber.from(bank.tokenPeg));

      const ltv = collateral.isZero()
        ? BigNumber.from(0)
        : debt.mul(10000).div(collateral);
      const maxLtv =
        10000 / Number(utils.formatUnits(bank.minimumCollateralPercentage, 0));

      const vault = find(BankTokenInfo, { erc20: collat[0] });
      return {
        name,
        debt,
        collateral,
        ltv,
        id: name,
        maxLtv,
        tokenInfo: vault,
      };
    })
    .filter((n) => n);

  // Get total collateral from banks
  const totalCollateral = indivBanks.reduce((prev, next) => {
    return prev.add(next.collateral);
  }, BigNumber.from(0));

  // USD held in exchange
  const result = Number(
    utils.formatUnits(bankExchangePoolData.data.exchanges[0].usdHeld, 6)
  );

  //usdc-avai farm
  const usdcAvaiTVL = await yieldFarmData(
    FarmTokenInfo['USDC-AVAI'].address.mainnet.toLowerCase()
  );
  //usdc-avai farm
  const avaxOrcaTVL = await yieldFarmData(
    FarmTokenInfo['AVAX-ORCA'].address.mainnet.toLowerCase()
  );
  res
    .status(200)
    .json(
      result +
        Number(utils.formatEther(totalCollateral)) +
        usdcAvaiTVL +
        avaxOrcaTVL
    );
}
