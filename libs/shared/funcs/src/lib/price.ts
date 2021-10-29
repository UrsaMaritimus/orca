import { Web3Provider } from '@ethersproject/providers';
import { VaultTypes } from '@orca/shared/contracts';

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

// swr
export const allBankPrices = () => {
  return async (_: string, library: Web3Provider, chainId: number) => {
    const results = await Promise.all(
      VaultTypes.map(async (vaultType) => {
        console.log(vaultType);
        const vault = getVault(vaultType.name, library, chainId);
        if (vault) {
          const price = await vault.getPriceSource();
          const peg = await vault.getPricePeg();
          return { price, peg, symbol: vaultType.symbol, name: vaultType.name };
        }
      })
    );

    return results.filter((n) => n);
  };
};
