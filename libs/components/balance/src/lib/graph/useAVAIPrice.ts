import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';
import {
  useOrcaStatsSubscription,
  useGetTokenPriceSubscription,
  useAvaxPriceSubscription,
  useAvaiStatsSubscription,
} from '@orca/graphql';

export const useAvaiPrice = () => {
  const { loading, data } = useAvaiStatsSubscription();

  const { data: avaiPrice } = useGetTokenPriceSubscription({
    variables: {
      id: tokenInfo['AVAI'].address.mainnet.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();

  if (!loading && avaiPrice && avaxPrice) {
    const circulatingSupply = Number(
      utils.formatEther(BigNumber.from(data.stablecoin.totalSupply))
    );

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const avaiUSDPrice = Number(avaiPrice.token?.derivedETH) * avaxUSDPrice;

    return {
      loading: false,
      data: {
        circulatingSupply,
        marketcap: avaiUSDPrice * circulatingSupply,
        avaiUSDPrice: avaiUSDPrice,
        avaiAVAXPrice: Number(avaiPrice.token?.derivedETH),
      },
    };
  } else {
    return { loading: true };
  }
};
