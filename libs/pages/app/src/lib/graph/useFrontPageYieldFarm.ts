import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import {
  useGeneralYieldInfoSubscription,
  useGetTokenDataSubscription,
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

  if (yieldData && tokenData) {
    const poolAlloc = Number(yieldData.pools[0].allocPoint);
    const totalAllocPoints = Number(yieldData.pools[0].leader.totalAllocPoints);
    const orcaPerSec = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0].leader.orcaPerSec))
    );
    const totalStaked = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0].totalStaked))
    );

    const rewardPerDay = (poolAlloc / totalAllocPoints) * orcaPerSec * 86400;

    const TVL =
      (totalStaked / tokenData.pairs[0].totalSupply) *
      tokenData.pairs[0].reserveUSD;

    // Temp price for now for Orca, get from pangolin come launch
    // #TODO
    const apr = (((rewardPerDay * 36500) / TVL) * 20) / 100;

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0].id, 0),
        rewardPerDay: rewardPerDay,
        tvl: TVL,
        apr: apr,
        treasury:
          Number(
            utils.formatEther(BigNumber.from(yieldData.pools[0].treasuryAmount))
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
