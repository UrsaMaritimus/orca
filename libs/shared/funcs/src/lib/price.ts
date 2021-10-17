import { Web3Provider } from '@ethersproject/providers';

import { getVault } from './getVault';
// swr
export const bankPrice = () => {
  return async (
    _: string,
    library: Web3Provider,
    vaultType: string,
    chainId: number
  ) => {
    const vault = getVault(vaultType, library, chainId);
    const price = await vault.getPriceSource();
    const peg = await vault.getPricePeg();

    return { price, peg };
  };
};
