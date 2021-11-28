import { Web3Provider } from '@ethersproject/providers';
import { getVault } from './getVault';

export const liquidateVault = async (
  library: Web3Provider,
  chainId: number,
  vaultType: string,
  vaultID: number
) => {
  const vault = getVault(vaultType, library, chainId, true);
  return vault.liquidateVault(vaultID);
};
