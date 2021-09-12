import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

const getBlockNumber = (library: Web3Provider | undefined) => {
  if (library)
    return async () => {
      return library.getBlockNumber();
    };
  else
    return () => {
      return 0;
    };
};

export const useBlockNumber = () => {
  const { library } = useWeb3React<Web3Provider>();
  const shouldFetch = !!library;

  return useSWR(shouldFetch ? ['BlockNumber'] : null, getBlockNumber(library), {
    refreshInterval: 2.5 * 1000,
  });
};
