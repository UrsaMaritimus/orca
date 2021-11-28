import { VaultContracts } from '@orca/shared';

export const getContract = (chainId: number, vaultType: string): string => {
  return chainId === 43113
    ? VaultContracts.fuji[vaultType]
    : chainId === 43114
    ? VaultContracts.mainnet[vaultType]
    : '';
};
