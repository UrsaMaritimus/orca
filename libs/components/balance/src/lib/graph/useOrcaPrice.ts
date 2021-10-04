import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';
import {
  useOrcaStatsSubscription,
  useGetTokenPriceSubscription,
  useAvaxPriceSubscription,
} from '@orca/graphql';

export const useOrcaPrice = () => {
  const { loading, data } = useOrcaStatsSubscription({
    variables: {
      // TODO main
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const { data: orcaPrice } = useGetTokenPriceSubscription({
    variables: {
      // TODO main
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();

  if (!loading && orcaPrice && avaxPrice) {
    const circulatingSupply = Number(
      utils.formatEther(BigNumber.from(data.orca.circulatingSupply))
    );
    const maxSupply = Number(
      utils.formatEther(BigNumber.from(data.orca.maxSupply))
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
