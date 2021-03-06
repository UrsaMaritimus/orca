import { BigNumber, utils } from 'ethers';
import { VaultContracts, BankTokenInfo } from '@orca/shared';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import {
  useBankInfoFrontPageQuery,
  useExchangeInfoFrontPageQuery,
  useTotalSupplyFrontPageQuery,
} from '@orca/graphql';

import find from 'lodash/find';
import includes from 'lodash/includes';

import { allBankPricesNoWeb3 } from '@orca/web3';

export const useFrontPageInfo = () => {
  const { data: supplyFrontPage, loading: supplyLoading } =
    useTotalSupplyFrontPageQuery({ pollInterval: 5000 });
  const { data: exchangeInfoFrontPage, loading: exchangeLoading } =
    useExchangeInfoFrontPageQuery({ pollInterval: 5000 });
  const { data: bankInfoFrontPage, loading: bankLoading } =
    useBankInfoFrontPageQuery({ pollInterval: 5000 });

  // Grab bank prices
  const { data: prices, mutate: priceMutate } = useSwr(
    [`getAllPrices`],
    allBankPricesNoWeb3()
  );
  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  if (!supplyLoading && !exchangeLoading && !bankLoading && prices) {
    const avaiSupply = supplyFrontPage.stablecoins.reduce(
      (prev, next) => prev.add(BigNumber.from(next.totalSupply)),
      BigNumber.from(0)
    );
    const stableUSDSupply = exchangeInfoFrontPage.exchanges.reduce(
      (prev, next) => {
        return prev.add(BigNumber.from(next.usdHeld));
      },
      BigNumber.from(0)
    );

    const bankTreasury = bankInfoFrontPage.banks.reduce((prev, next) => {
      return prev.add(
        BigNumber.from(next.treasury)
          .mul(10 ** (18 - next.token.decimals))
          .mul(BigNumber.from(next.token.price.priceUSD))
          .div(BigNumber.from(next.tokenPeg))
      );
    }, BigNumber.from(0));

    const exchangeTreasury = exchangeInfoFrontPage.exchanges.reduce(
      (prev, next) => {
        return prev.add(BigNumber.from(next.treasury));
      },
      BigNumber.from(0)
    );

    const exchangeTVL = exchangeInfoFrontPage.exchanges.reduce((prev, next) => {
      return prev.add(BigNumber.from(next.usdHeld));
    }, BigNumber.from(0));

    const indivBanks = bankInfoFrontPage.banks
      .filter((bank) => {
        return (
          includes(VaultContracts.mainnet, bank.id.toLowerCase()) ||
          includes(VaultContracts.fuji, bank.id.toLowerCase())
        );
      })
      .map((bank) => {
        // Get the correct collateral type
        let collat = Object.keys(VaultContracts.mainnet).filter(
          (key) => VaultContracts.mainnet[key] === bank.id.toLowerCase()
        );

        collat =
          collat.length > 0
            ? collat
            : Object.keys(VaultContracts.fuji).filter(
                (key) => VaultContracts.fuji[key] === bank.id.toLowerCase()
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
          10000 /
          Number(utils.formatUnits(bank.minimumCollateralPercentage, 0));

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

    const totalCollateral = indivBanks.reduce((prev, next) => {
      return prev.add(next.collateral);
    }, BigNumber.from(0));

    const totalDebt = indivBanks.reduce((prev, next) => {
      return prev.add(next.debt);
    }, BigNumber.from(0));

    return {
      loading: false,
      data: {
        avaiSupply,
        stableUSDSupply,
        totalCollateral,
        totalDebt,
        bankTreasury,
        exchangeTreasury,
        indivBanks,
        exchangeTVL,
      },
    };
  } else {
    return { loading: true, data: null };
  }
};
