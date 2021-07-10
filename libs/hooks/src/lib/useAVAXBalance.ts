import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import { parseBalance } from '@ursa/util';
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive';

const getAVAXBalance = (library: Web3Provider) => {
  return async (_: string, address: string) => {
    return library.getBalance(address).then((balance) => parseBalance(balance));
  };
};

export const useAVAXBalance = (address: string, suspense = false) => {
  const { library, chainId } = useWeb3React();

  const shouldFetch = typeof address === 'string' && !!library;

  const result = useSWR(
    shouldFetch ? ['AVAXBalance', address, chainId] : null,
    getAVAXBalance(library),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};
