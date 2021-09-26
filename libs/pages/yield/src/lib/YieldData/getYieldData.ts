import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import {
  useGeneralYieldInfoSubscription,
  useGetTokenDataSubscription,
  useUserStakedSubscription,
} from '@orca/graphql';

export const useMonitorFarms = (farm: string, account: string) => {
  const { data: yieldData } = useGeneralYieldInfoSubscription({
    variables: {
      pair: farm,
    },
  });

  const { data: userData } = useUserStakedSubscription({
    variables: {
      id: account ? account.toLowerCase() : '',
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

  if (yieldData && userData && tokenData) {
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
    const apr = (((rewardPerDay * 36500) / TVL) * 20) / 100;

    const userStaked = account
      ? userData.user?.pools?.filter((pool) => pool.pool.pair === farm)[0]
          ?.staked
      : null;

    const userStakedUSD = userStaked
      ? (Number(utils.formatEther(BigNumber.from(userStaked))) /
          tokenData.pairs[0].totalSupply) *
        tokenData.pairs[0].reserveUSD
      : null; // Avai is $1, obv

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0].id, 0),
        rewardPerDay: rewardPerDay,
        tvl: TVL,
        apr: apr,
        userStaked: account
          ? userStaked
            ? utils.formatEther(userStaked)
            : '0'
          : null,
        userStakedUSD: account ? (userStakedUSD ? userStakedUSD : 0) : null,
      },
    };
  } else {
    return { loading: true };
  }
};

// For avai farm for testing
export const useMonitorFarmAvai = (farm: string, account: string) => {
  const { data: yieldData } = useGeneralYieldInfoSubscription({
    variables: {
      pair: farm,
    },
  });

  const { data: userData } = useUserStakedSubscription({
    variables: {
      id: account ? account.toLowerCase() : '',
    },
  });

  if (yieldData && userData) {
    const poolAlloc = Number(yieldData.pools[0].allocPoint);
    const totalAllocPoints = Number(yieldData.pools[0].leader.totalAllocPoints);
    const orcaPerSec = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0].leader.orcaPerSec))
    );
    const totalStaked = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0].totalStaked))
    );

    const rewardPerDay = (poolAlloc / totalAllocPoints) * orcaPerSec * 86400;

    const TVL = totalStaked;

    // Temp price for now for Orca, get from pangolin come launch
    const apr = (((rewardPerDay * 36500) / TVL) * 20) / 100; // 20 cents

    const userStaked = account
      ? userData.user?.pools?.filter((pool) => pool.pool.pair === farm)[0]
          ?.staked
      : null;

    const userStakedUSD = userStaked ? userStaked : null; // Avai is $1, obv

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0].id, 0),
        rewardPerDay: rewardPerDay,
        tvl: TVL,
        apr: apr,
        userStaked: account
          ? userStaked
            ? utils.formatEther(userStaked)
            : '0'
          : null,
        userStakedUSD: account
          ? userStakedUSD
            ? Number(utils.formatEther(userStakedUSD))
            : 0
          : null,
      },
    };
  } else {
    return { loading: true };
  }
};
