import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { getContract, bankPrice } from '@orca/shared/funcs';
import { useUserVaultsSubscription } from '@orca/graphql';
import { tokenInfo } from '@orca/shared/base';

export const useGetVaults = (
  library: Web3Provider,
  chainId: number,
  account: string,
  vaultType: string,
  token: string
) => {
  const shouldFetch = !!library;
  const { data: vaultData } = useUserVaultsSubscription({
    variables: {
      user: account.toLowerCase(),
      bank: getContract(chainId, vaultType).toLowerCase(),
    },
  });
  // Grab bank prices
  const { data: price, mutate: priceMutate } = useSwr(
    shouldFetch ? [`get${vaultType}Price`, library, vaultType, chainId] : null,
    bankPrice()
  );
  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  return {
    loading: price && vaultData ? false : true,
    rows:
      price && vaultData
        ? vaultData.vaults.map((vault) => {
            const collateral = BigNumber.from(vault.collateral);
            const debt = BigNumber.from(vault.debt);
            const ratio = debt.isZero()
              ? utils.formatUnits(0, 0)
              : debt
                  .mul(price.peg)
                  .mul(10000)
                  .div(
                    collateral
                      .mul(price.price)
                      .mul(10 ** (18 - tokenInfo[token].decimals))
                  )
                  .toNumber() / 100;
            return {
              vaultID: BigNumber.from(vault.number).toNumber().toString(),
              collateral:
                vault.id === '0x1-' + vault.bank.id
                  ? utils.formatEther(vault.bank.treasury)
                  : utils.formatUnits(collateral, tokenInfo[token].decimals),
              debt: utils.formatEther(debt),
              ratio: ratio.toString(),
            };
          })
        : null,
  };
};
