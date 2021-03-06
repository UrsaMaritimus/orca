import { BigNumber, utils } from 'ethers';
import { ProtocolTokenInfo } from '@orca/shared';
import {
  useOrcaStatsQuery,
  useGetTokenPriceQuery,
  useAvaxPriceQuery,
} from '@orca/graphql';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const useOrcaPrice = () => {
  //web3
  const { chainId, library } = useWeb3React<Web3Provider>();
  const { data } = useOrcaStatsQuery({
    variables: {
      id:
        chainId === 43114 || !chainId
          ? ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase()
          : ProtocolTokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: orcaPrice } = useGetTokenPriceQuery({
    variables: {
      id:
        chainId === 43114 || !chainId
          ? ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase()
          : ProtocolTokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: avaxPrice } = useAvaxPriceQuery({ pollInterval: 5000 });
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
