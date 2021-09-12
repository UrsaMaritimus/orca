import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import { parseBalance } from '@orca/util';
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive';
import { BigNumber } from '@ethersproject/bignumber';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useAVAXBalance = (address: string, suspense = false) => {
  const { library, chainId } = useWeb3React();

  const shouldFetch = typeof address === 'string' && !!library;

  const { data, mutate } = useSWR(
    shouldFetch ? `/api/balance/${chainId}/${address}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  useKeepSWRDataLiveAsBlocksArrive(mutate);

  return { data: parseBalance(BigNumber.from(data ? data.balance : 0)) };
};
