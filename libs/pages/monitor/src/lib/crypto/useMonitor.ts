import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { getContract, bankPrice } from '@orca/shared/funcs';
import { useMonitorVaultsSubscription } from '@orca/graphql';

export const useMonitorVaults = (library: Web3Provider, chainId: number) => {
  const shouldFetch = !!library;
  const { data: vaultData } = useMonitorVaultsSubscription({
    variables: {
      bankID: getContract(chainId, 'wavax').toLowerCase(),
    },
  });

  // Grab bank prices
  const { data: price, mutate: priceMutate } = useSwr(
    shouldFetch ? ['getAvaxPrice', library, 'wavax', chainId] : null,
    bankPrice()
  );
  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  return {
    loading: price && vaultData ? false : true,
    rows:
      price && vaultData
        ? vaultData.vaults
            .map((vault) => {
              const collateral = BigNumber.from(vault.collateral);
              const debt = BigNumber.from(vault.debt);
              const cp = collateral
                .mul(100)
                .mul(price.price)
                .div(debt.mul(price.peg));
              return {
                num: BigNumber.from(vault.id).toNumber(),
                collateral: collateral.mul(price.price).div(price.peg),
                debt: debt,
                cp,
              };
            })
            .filter((vault) => vault.cp.lte(200))
        : null,
  };
};
