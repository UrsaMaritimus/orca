import { BigNumber, utils } from 'ethers';

import {
  useGeneralYieldInfoSubscription,
  useGetTokenDataSubscription,
} from '@orca/graphql';

export const useFrontPageYieldInfo = (farm: string) => {
  const { data: yieldData } = useGeneralYieldInfoSubscription({
    variables: {
      pair: farm,
    },
  });

  const { data: tokenData } = useGetTokenDataSubscription({
    variables: {
      id:
        farm === '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'
          ? '0xe28984e1ee8d431346d32bec9ec800efb643eef4'
          : farm, // For testnet
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
      farm === '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385'
        ? totalStaked
        : (totalStaked / tokenData.pairs[0].totalSupply) *
          tokenData.pairs[0].reserveUSD;

    // Temp price for now for Orca, get from pangolin come launch
    const apr = (((rewardPerDay * 36500) / TVL) * 20) / 100;

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0].id, 0),
        rewardPerDay: rewardPerDay,
        tvl: TVL,
        apr: apr,
      },
    };
  } else {
    return { loading: true };
  }
};
