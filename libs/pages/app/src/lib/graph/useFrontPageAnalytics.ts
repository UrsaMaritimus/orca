import { BigNumber } from 'ethers';

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
    console.log(exchangeInfoFrontPage.exchanges);
    return {
      loading: false,
      data: {
        avaiSupply,
        stableUSDSupply,
        totalCollateral,
        totalDebt,
        bankTreasury,
        exchangeTreasury,
      },
    };
  } else {
    return { loading: true, data: null };
  }
};
