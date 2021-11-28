import { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';
import { bankPrice } from '@orca/web3';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

export const useGetPrices = (library: Web3Provider, chainId: number) => {
  const shouldFetch = !!library;
  // Grab AVAX price
  const { data: wavaxPrice, mutate: wavaxPriceMutate } = useSWR(
    shouldFetch ? ['getAvaxPrice', library, 'wavax', chainId] : null,
    bankPrice()
  );
  useKeepSWRDataLiveAsBlocksArrive(wavaxPriceMutate);

  return {
    loading: wavaxPrice ? false : true,
    prices: { WAVAX: wavaxPrice },
  };
};
