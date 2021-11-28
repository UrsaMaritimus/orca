import { Web3Provider } from '@ethersproject/providers';
import { VaultTypes } from '@orca/shared';

import { ethers } from 'ethers';

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
    if (vault) {
      const price = await vault.getPriceSource();
      const peg = await vault.getPricePeg();

      return { price, peg };
    } else return null;
  };
};

// swr
export const allBankPrices = () => {
  return async (_: string, library: Web3Provider, chainId: number) => {
    const results = await Promise.all(
      VaultTypes.map(async (vaultType) => {
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
export const allBankPricesNoWeb3 = () => {
  return async (_: string) => {
    const fuji = process.env.NEXT_PUBLIC_GRAPH_HTTP.includes('orcadao')
      ? true
      : false;

    const provider = new ethers.providers.JsonRpcProvider(
      fuji
        ? 'https://api.avax-test.network/ext/bc/C/rpc'
        : 'https://api.avax.network/ext/bc/C/rpc'
    );
    const results = await Promise.all(
      VaultTypes.map(async (vaultType) => {
        const vault = getVault(vaultType.name, provider, fuji ? 43113 : 43114);
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
