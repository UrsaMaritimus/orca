import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared';
import {
  useGetTokenPriceQuery,
  useAvaxPriceQuery,
  useAvaiStatsQuery,
} from '@orca/graphql';

export const useAvaiPrice = () => {
  const { loading, data } = useAvaiStatsQuery({ pollInterval: 5000 });

  const { data: avaiPrice } = useGetTokenPriceQuery({
    variables: {
      id: tokenInfo['AVAI'].address.mainnet.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: avaxPrice } = useAvaxPriceQuery({ pollInterval: 5000 });

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
