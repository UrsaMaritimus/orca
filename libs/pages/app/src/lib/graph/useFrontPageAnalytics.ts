import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import {
  useBankInfoFrontPageSubscription,
  useExchangeInfoFrontPageSubscription,
  useTotalSupplyFrontPageSubscription,
} from '@orca/graphql';
import { useGetPrices } from './price';

export const useFrontPageInfo = (library: Web3Provider, chainId: number) => {
  const { data: supplyFrontPage, loading: supplyLoading } =
    useTotalSupplyFrontPageSubscription({});
  const { data: exchangeInfoFrontPage, loading: exchangeLoading } =
    useExchangeInfoFrontPageSubscription({});
  const { data: bankInfoFrontPage, loading: bankLoading } =
    useBankInfoFrontPageSubscription({});

  const { prices, loading: priceLoading } = useGetPrices(library, chainId);

  if (!supplyLoading && !exchangeLoading && !bankLoading && !priceLoading) {
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
        BigNumber.from(next.totalCollateral).mul(
          prices[next.token.symbol].price
        )
      );
    }, BigNumber.from(0));

    const bankTreasury = bankInfoFrontPage.banks.reduce((prev, next) => {
      return prev.add(
        BigNumber.from(next.treasury)
          .mul(prices[next.token.symbol].price)
          .div(prices[next.token.symbol].peg)
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
