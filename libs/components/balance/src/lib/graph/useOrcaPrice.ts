import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';
import {
  useOrcaStatsSubscription,
  useGetTokenPriceSubscription,
  useAvaxPriceSubscription,
} from '@orca/graphql';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const useOrcaPrice = () => {
  //web3
  const { chainId, library } = useWeb3React<Web3Provider>();
  const { data } = useOrcaStatsSubscription({
    variables: {
      id:
        chainId === 43114 || !chainId
          ? tokenInfo['ORCA'].address.mainnet.toLowerCase()
          : tokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
  });

  const { data: orcaPrice } = useGetTokenPriceSubscription({
    variables: {
      id:
        chainId === 43114 || !chainId
          ? tokenInfo['ORCA'].address.mainnet.toLowerCase()
          : tokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();
  if (library && data && orcaPrice && avaxPrice) {
    const circulatingSupply = Number(
      utils.formatEther(
        BigNumber.from(data.orca ? data.orca?.circulatingSupply : 0)
      )
    );
    const maxSupply = Number(
      utils.formatEther(BigNumber.from(data.orca ? data.orca.maxSupply : 0))
    );
    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    return {
      loading: false,
      data: {
        maxSupply,
        circulatingSupply,
        marketcap: orcaUSDPrice * circulatingSupply,
        orcaUSDPrice: orcaUSDPrice,
        orcaAVAXPrice: Number(orcaPrice.token?.derivedETH),
      },
    };
  } else {
    return { loading: true };
  }
};
