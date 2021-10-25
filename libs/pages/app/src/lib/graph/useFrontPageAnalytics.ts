import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';
import { VaultContracts } from '@orca/shared/contracts';

import {
  useBankInfoFrontPageSubscription,
  useExchangeInfoFrontPageSubscription,
  useTotalSupplyFrontPageSubscription,
} from '@orca/graphql';
import { find, includes } from 'lodash';

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
        console.log(collat);
        const name = bank.token.symbol.toLowerCase();
        const debt = BigNumber.from(bank.totalDebt);
        const collateral = BigNumber.from(bank.totalCollateral)
          .mul(10 ** (18 - bank.token.decimals))
          .mul(BigNumber.from(bank.token.price.priceUSD))
          .div(BigNumber.from(bank.tokenPeg));

        const ltv = collateral.isZero()
          ? BigNumber.from(0)
          : debt.mul(10000).div(collateral);
        const maxLtv =
          10000 /
          Number(utils.formatUnits(bank.minimumCollateralPercentage, 0));

        const vault = find(tokenInfo, { erc20: collat[0] });
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
