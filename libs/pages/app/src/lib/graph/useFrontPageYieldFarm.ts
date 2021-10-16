import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import {
  useGeneralYieldInfoSubscription,
  useGetTokenDataSubscription,
  useAvaxPriceSubscription,
  useGetTokenPriceSubscription,
} from '@orca/graphql';

export const useFrontPageYieldInfo = (farm: string) => {
  const { data: yieldData } = useGeneralYieldInfoSubscription({
    variables: {
      pair: farm.toLowerCase(),
    },
  });

  const { data: tokenData } = useGetTokenDataSubscription({
    variables: {
      id: farm.toLowerCase(),
    },
  });

  const { data: orcaPrice } = useGetTokenPriceSubscription({
    variables: {
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();

  if (yieldData && tokenData && orcaPrice && avaxPrice) {
    const poolAlloc = Number(yieldData.pools[0]?.allocPoint);
    const totalAllocPoints = Number(
      yieldData.pools[0]?.leader.totalAllocPoints
    );
    const orcaPerSec = Number(
      utils.formatEther(
        BigNumber.from(yieldData.pools[0]?.leader.orcaPerSec || 0)
      )
    );
    const totalStaked = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0]?.totalStaked || 0))
    );

    const rewardPerDay = (poolAlloc / totalAllocPoints) * orcaPerSec * 86400;

    const TVL =
      (totalStaked / tokenData.pairs[0].totalSupply) *
      tokenData.pairs[0].reserveUSD;

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;
    const apr = ((rewardPerDay * 36500) / TVL) * orcaUSDPrice;

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0]?.id || 0, 0),
        rewardPerDay: rewardPerDay,
        tvl: TVL,
        apr: apr,
        treasury:
          Number(
            utils.formatEther(
              BigNumber.from(yieldData.pools[0]?.treasuryAmount || 0)
            )
          ) *
          (farm === tokenInfo['AVAI'].address.fuji.toLowerCase()
            ? 1
            : tokenData.pairs[0].reserveUSD / tokenData.pairs[0].totalSupply),
      },
    };
  } else {
    return { loading: true };
  }
};
