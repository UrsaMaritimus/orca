import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import {
  useGeneralYieldInfoSubscription,
  useGetTokenDataSubscription,
  useUserStakedSubscription,
  useAvaxPriceSubscription,
  useGetTokenPriceSubscription,
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
      id: farm,
    },
  });

  const { data: orcaPrice } = useGetTokenPriceSubscription({
    variables: {
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();

  if (yieldData && userData && tokenData && orcaPrice && avaxPrice) {
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

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    const apr = ((rewardPerDay * 36500) / TVL) * orcaUSDPrice;

    const userStaked = account
      ? userData.user?.pools?.filter((pool) => pool.pool.pair === farm)[0]
          ?.staked
      : null;

    const userStakedUSD = userStaked
      ? (Number(utils.formatEther(BigNumber.from(userStaked))) /
          tokenData.pairs[0].totalSupply) *
        tokenData.pairs[0].reserveUSD
      : null;

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
