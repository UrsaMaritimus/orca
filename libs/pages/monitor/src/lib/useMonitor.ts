import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { getContract, bankPrice } from '@orca/shared/funcs';
import {
  useMonitorVaultsSubscription,
  useBankMcpSubscription,
} from '@orca/graphql';

export const useMonitorVaults = (
  library: Web3Provider,
  chainId: number,
  token: string
) => {
  const shouldFetch = !!library;
  const { data: vaultData } = useMonitorVaultsSubscription({
    variables: {
      bankID: getContract(chainId, token).toLowerCase(),
    },
  });

  const { data: bankData } = useBankMcpSubscription({
    variables: {
      id: getContract(chainId, token).toLowerCase(),
    },
  });

  // Grab bank prices
  const { data: price, mutate: priceMutate } = useSwr(
    shouldFetch ? [`get${token}Price`, library, token, chainId] : null,
    bankPrice()
  );
  useKeepSWRDataLiveAsBlocksArrive(priceMutate);

  return {
    loading: price && vaultData && bankData ? false : true,
    rows:
      price && vaultData && bankData
        ? vaultData.vaults
            .map((vault) => {
              const collateral = BigNumber.from(vault.collateral);
              const debt = BigNumber.from(vault.debt);
              const cp = collateral
                .mul(100)
                .mul(price.price)
                .div(debt.mul(price.peg));
              return {
                num: BigNumber.from(vault.number).toNumber(),
                collateral: collateral.mul(price.price).div(price.peg),
                debt: debt,
                cp,
                mcp: BigNumber.from(bankData.bank?.minimumCollateralPercentage),
              };
            })
            .filter((vault) => vault.cp.lte(vault.mcp.add(50)))
        : null,
  };
};
