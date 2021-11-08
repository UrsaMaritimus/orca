import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { bankPrice } from '@orca/shared/funcs';
import { useVaultInfoQuery } from '@orca/graphql';
import { VaultContracts } from '@orca/shared/contracts';

export const useGetVaultInfo = (
  library: Web3Provider,
  chainId: number,
  vaultID: string,
  account: string,
  vaultType: string,
  decimals: number
) => {
  const shouldFetch = !!library;
  const { data: vaultData, loading } = useVaultInfoQuery({
    variables: {
      vaultID:
        '0x' +
        Number(vaultID).toString(16) +
        '-' +
        (chainId === 43114 || !chainId
          ? VaultContracts.mainnet[vaultType]?.toLowerCase()
          : VaultContracts.fuji[vaultType]?.toLowerCase()),
    },
    pollInterval: 5000,
  });

  // Grab bank prices
  const { data: price, mutate: priceMutate } = useSwr(
    shouldFetch ? [`get${vaultType}Price`, library, vaultType, chainId] : null,
    bankPrice()
  );
  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  if (!loading && vaultData.vault && price) {
    const collateral = BigNumber.from(vaultData.vault.collateral);
    const debt = BigNumber.from(vaultData.vault.debt);
    const mcp = BigNumber.from(
      vaultData.vault.bank.minimumCollateralPercentage
    );
    const tokenPrice = BigNumber.from(price.price);
    const peg = BigNumber.from(price.peg);
    // Calc values
    const maxLTV = 10000 / mcp.toNumber(); // 66.666%
    const maxLTVUSD = collateral
      .mul(tokenPrice)
      .mul(100)
      .div(peg)
      .div(mcp)
      .mul(10 ** (18 - decimals));
    // Current LTV in the vault
    const LTV = collateral.isZero()
      ? utils.parseUnits('0', 0)
      : debt
          .mul(1e8)
          .mul(peg)
          .div(collateral.mul(tokenPrice).mul(10 ** (18 - decimals))); // Loan to value ratio

    // Borrow power
    const borrowingPowerUsed = LTV.mul(mcp).div(100);
    const borrowingPowerUsedUSD = debt;
    const borrowingPowerAvailable = utils
      .parseUnits('100', 6)
      .sub(borrowingPowerUsed);

    const borrowingPowerAvailableUSD = maxLTVUSD.sub(debt);

    const availableWithdraw = collateral.sub(
      debt
        .mul(peg)
        .div(tokenPrice)
        .mul(mcp)
        .div(100)
        .div(10 ** (18 - decimals))
    );
    return {
      loading: false,
      vaultInfo: {
        mcp,
        closingFee: BigNumber.from(vaultData.vault.bank.closingFee),
        openingFee: BigNumber.from(vaultData.vault.bank.openingFee),
        peg,
        tokenPrice,
        collateral,
        debt,
        LTV,
        maxLTV,
        maxLTVUSD,
        borrowingPowerAvailable,
        borrowingPowerAvailableUSD,
        borrowingPowerUsed,
        borrowingPowerUsedUSD,
        availableWithdraw,
        isOwner: vaultData.vault.user.id === account.toLowerCase(),
      },
    };
  } else {
    return { loading: true, vaultInfo: null };
  }
};
