import { utils, BigNumber } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';

import useSwr from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { getContract, bankPrice } from '@orca/shared/funcs';
import {
  useMonitorVaultsSubscription,
  useBankMcpSubscription,
} from '@orca/graphql';
import { tokenInfo } from '@orca/shared/base';

export const useMonitorVaults = (
  library: Web3Provider,
  chainId: number,
  vaultType: string,
  token: string
) => {
  const shouldFetch = !!library;
  const { data: vaultData } = useMonitorVaultsSubscription({
    variables: {
      bankID: getContract(chainId, vaultType).toLowerCase(),
    },
  });

  const { data: bankData } = useBankMcpSubscription({
    variables: {
      id: getContract(chainId, vaultType).toLowerCase(),
    },
  });

  // Grab bank prices
  const { data: price, mutate: priceMutate } = useSwr(
    shouldFetch ? [`get${vaultType}Price`, library, vaultType, chainId] : null,
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
                .mul(10 ** (18 - tokenInfo[token].decimals))
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
