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
  43113: 'testnet.',
  43114: '',
};

export function formatEtherscanLink(
  type: 'Account' | 'Transaction',
  data: [number, string]
) {
  switch (type) {
    case 'Account': {
      const [chainId, address] = data;
      return `https://${CCHAIN_PREFIXES[chainId]}snowtrace.io/address/${address}`;
    }
    case 'Transaction': {
      const [chainId, hash] = data;
      return `https://${CCHAIN_PREFIXES[chainId]}snowtrace.io/tx/${hash}`;
    }
  }
}
export const parseBalance = (balance: BigNumberish, decimals = 18) =>
  fShortenNumber(Number(formatUnits(balance, decimals)));
