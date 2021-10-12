import {
  JSBI,
  Pair,
  Percent,
  Router,
  TokenAmount,
  Token,
  WAVAX,
  Trade,
} from '@pangolindex/sdk';

import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';
import { GraphQLClient, gql } from 'graphql-request';

import { ERC20__factory } from '../../../../libs/shared/contracts/src';

import { Pair__factory, Router__factory } from '../../contracts';

// Pangolin
const AVAI_ORCA = '0x1a9bd67c82c0e8e47c3ad2fa772fcb9b7a831a37';
const AVAX_ORCA = '0x73e6cb72a79dea7ed75ef5ed6f8cff86c9128ef5';
const USDC_WAVAX = '0xbd918Ed441767fe7924e99F6a0E0B568ac1970D9';
const PANGOLIN_ROUTER = '0xe54ca86531e17ef3616d22ca28b0d458b6c89106';

// Addresses
const SEAFUND_ADDRESS = '0xcb660A14A6612E0627A4516c3DCdB3838b1190e9';

const TREASURY_ADDRESS = '0x10131d4f3193a59A46d3ab57D765f2604e77B4E3';

const ORCA_STAKING_ADDRESS = '0xA3654801Ba6FB21d5A984F9a857441395dDeccFb';

const DEV_WALLET = '0x274280b26debd319c52f611b59926f8f00373907';

// ERC20
const USDC_MAIN = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';

const TokenData = gql`
  query GetTokenData($id: ID!) {
    pairs(first: 5, where: { id: $id }) {
      id
      reserveUSD
      totalSupply
    }
  }
`;

const AvaxPrice = gql`
  query AvaxPrice {
    bundle(id: "1") {
      id
      ethPrice
    }
  }
`;

const PNG_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/pangolindex/exchange';

const client = new GraphQLClient(PNG_ENDPOINT);

const chainId = 43114;

const currentTimestamp = ethers.BigNumber.from(new Date().getTime() + 100000);

const DistributeToCorrectLocations = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  //ERC20
  const USDC = ERC20__factory.connect(USDC_MAIN, signer);

  // Get AVAX total
  const avaxPrice = Number((await client.request(AvaxPrice)).bundle.ethPrice);
  const totalAvax = (await signer.getBalance()).sub(
    ethers.utils.parseEther('10')
  );
  const usdAVAX = Number(ethers.utils.formatEther(totalAvax)) * avaxPrice;

  // Get USDC total
  const usdUSDC = Number(
    ethers.utils.formatUnits(await USDC.balanceOf(await signer.getAddress()), 6)
  );
  // Get AVAI-ORCA LP price
  const AVAI_ORCA_DATA = await client.request(TokenData, { id: AVAI_ORCA });
  const aoPair = Pair__factory.connect(AVAI_ORCA, signer);
  const aoBalance = Number(
    ethers.utils.formatUnits(await aoPair.balanceOf(await signer.getAddress()))
  );
  const aoUSD =
    (aoBalance / Number(AVAI_ORCA_DATA.pairs[0].totalSupply)) *
    Number(AVAI_ORCA_DATA.pairs[0].reserveUSD);

  // Get AVAX-ORCA LP price
  const AVAX_ORCA_DATA = await client.request(TokenData, { id: AVAX_ORCA });
  const avoPair = Pair__factory.connect(AVAX_ORCA, signer);
  const avoBalance = Number(
    ethers.utils.formatUnits(await avoPair.balanceOf(await signer.getAddress()))
  );
  const avoUSD =
    (avoBalance / Number(AVAX_ORCA_DATA.pairs[0].totalSupply)) *
    Number(AVAX_ORCA_DATA.pairs[0].reserveUSD);

  // Calculation time
  const total = avoUSD + aoUSD + usdUSDC + usdAVAX;
  const otherTotal = usdUSDC + usdAVAX;
  const orcaTotal = avoUSD + aoUSD;

  // Treasury
  const treasuryFromOther = total * 0.4 - orcaTotal; //from AVAX/USDC
  const treasuryFromOrca = orcaTotal; // From ORCA LPs

  //Seafund
  const seafund = total * 0.15; // from AVAX/USDC

  // Dev fee
  const devFees = total * 0.05; // from AVAX/USDC

  // Revenue distribution
  const distribution = total * 0.4; // from avax-usdc

  //Convert enoughh AVAX to USDC
  const convertAvaxUSD = distribution - usdAVAX;
  const convertAvaxAvax = convertAvaxUSD / avaxPrice;

  // Prepare for convert
  // Pangolin
  const router = Router__factory.connect(PANGOLIN_ROUTER, signer);

  const avax = WAVAX[chainId];
  const usdc_token = new Token(chainId, USDC_MAIN, 6, 'USDC.e', 'USD Coin');
  const usdcPair = Pair__factory.connect(USDC_WAVAX, signer);
  const { reserve0: usdcBalance, reserve1: avaxBalance } =
    await usdcPair.getReserves();
  const usdc_avax_pair = new Pair(
    new TokenAmount(avax, avaxBalance.toString()),
    new TokenAmount(usdc_token, usdcBalance.toString()),
    chainId
  ); /*
  const usdcTrade = Trade.bestTradeExactIn(
    [usdc_avax_pair],
    new TokenAmount(usdc_token, (convertAvaxUSD * 1e6).toFixed(0)),
    avax
  );

  
  const { args } = Router.swapCallParameters(usdcTrade[0], {
    feeOnTransfer: false,
    allowedSlippage: new Percent(JSBI.BigInt(50), JSBI.BigInt(10000)),
    deadline: currentTimestamp.toNumber(),
    recipient: await signer.getAddress(),
  });
  await router.swapExactTokensForAVAX(
    ethers.BigNumber.from(args[0]),
    ethers.BigNumber.from(args[1]),
    args[2] as string[],
    args[3] as string,
    currentTimestamp.toHexString()
  );*/
  // Now we have enough AVAX, send AVAX to OrcaStaking contract, and rest to multisigs!

  // Send to seafund

  // Send to treasury
  /*
  // USDC amount
  await USDC.transfer(
    TREASURY_ADDRESS,
    ethers.utils.parseUnits(treasuryFromOther.toFixed(6), 6)
  );

  // AVAI_ORCA
  await aoPair.transfer(
    TREASURY_ADDRESS,
    await aoPair.balanceOf(await signer.getAddress())
  );

  //AVAX_ORCA
  await avoPair.transfer(
    TREASURY_ADDRESS,
    await avoPair.balanceOf(await signer.getAddress())
  );*/

  // Send rest of usdc to dev fund
  await USDC.transfer(
    DEV_WALLET,
    await USDC.balanceOf(await signer.getAddress())
  );
};

DistributeToCorrectLocations()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
