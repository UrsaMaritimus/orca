import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { fCurrency, fShortenNumber } from '..';
import { fNumber } from './formatNumber';

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const CCHAIN_PREFIXES: { [index: number]: string } = {
  43113: 'avax-test.',
  43114: 'avax.',
};

export function formatEtherscanLink(
  type: 'Account' | 'Transaction',
  data: [number, string]
) {
  switch (type) {
    case 'Account': {
      const [chainId, address] = data;
      return `https://cchain.explorer.${CCHAIN_PREFIXES[chainId]}network/address/${address}`;
    }
    case 'Transaction': {
      const [chainId, hash] = data;
      return `https://cchain.explorer.${CCHAIN_PREFIXES[chainId]}network/tx/${hash}`;
    }
  }
}

export const parseBalance = (balance: BigNumberish, decimals = 18) =>
  fShortenNumber(Number(formatUnits(balance, decimals)));
