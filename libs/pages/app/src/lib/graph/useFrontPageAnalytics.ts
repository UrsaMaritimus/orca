import { BigNumber, utils } from 'ethers';

import {
  useBankInfoFrontPageSubscription,
  useExchangeInfoFrontPageSubscription,
  useTotalSupplyFrontPageSubscription,
} from '@orca/graphql';

export const useFrontPageInfo = () => {
  const { data: supplyFrontPage, loading: supplyLoading } =
    useTotalSupplyFrontPageSubscription({});
  const { data: exchangeInfoFrontPage, loading: exchangeLoading } =
    useExchangeInfoFrontPageSubscription({});
  const { data: bankInfoFrontPage, loading: bankLoading } =
    useBankInfoFrontPageSubscription({});

  if (!supplyLoading && !exchangeLoading && !bankLoading) {
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
    const totalDebt = bankInfoFrontPage.banks.reduce((prev, next) => {
      return prev.add(BigNumber.from(next.totalDebt));
    }, BigNumber.from(0));

    const totalCollateral = bankInfoFrontPage.banks.reduce((prev, next) => {
      return prev.add(
        BigNumber.from(next.totalCollateral)
          .mul(BigNumber.from(next.token.price.priceUSD))
          .div(BigNumber.from(next.tokenPeg))
      );
    }, BigNumber.from(0));

    const bankTreasury = bankInfoFrontPage.banks.reduce((prev, next) => {
      return prev.add(
        BigNumber.from(next.treasury)
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

    const indivBanks = bankInfoFrontPage.banks.map((bank) => {
      const name = bank.token.symbol.toLowerCase();
      const debt = BigNumber.from(bank.totalDebt);
      const collateral = BigNumber.from(bank.totalCollateral)
        .mul(BigNumber.from(bank.token.price.priceUSD))
        .div(BigNumber.from(bank.tokenPeg));
      const ltv = debt.mul(10000).div(collateral);
      const maxLtv =
        10000 / Number(utils.formatUnits(bank.minimumCollateralPercentage, 0));
      return {
        name,
        debt,
        collateral,
        ltv,
        id: name,
        maxLtv,
      };
    });

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
      },
    };
  } else {
    return { loading: true, data: null };
  }
};
