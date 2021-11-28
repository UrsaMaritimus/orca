import { BigNumber, utils } from 'ethers';

import { ProtocolTokenInfo } from '@orca/shared';

import {
  useAvaxPriceQuery,
  useGetTokenPriceQuery,
  useGeneralStakingInfoQuery,
  useUserStakingInfoQuery,
} from '@orca/graphql';

export const useMonitorFarms = (account: string, chainId: number) => {
  const { data: yieldData } = useGeneralStakingInfoQuery({
    pollInterval: 5000,
  });

  const { data: userData } = useUserStakingInfoQuery({
    variables: {
      id: account ? account.toLowerCase() : '',
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

  if (yieldData && userData && orcaPrice && avaxPrice) {
    const avaxPerSec = Number(
      utils.formatEther(BigNumber.from(yieldData.staking.avaxPerSec))
    );
    const totalStaked = Number(
      utils.formatEther(BigNumber.from(yieldData.staking.totalStaked))
    );

    const rewardPerDay = avaxPerSec * 86400;

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    const TVL =
      chainId === 43114 || !chainId
        ? totalStaked * orcaUSDPrice
        : totalStaked * 0.2;

    const apr = ((rewardPerDay * 36500) / TVL) * avaxUSDPrice;

    const userStaked = account
      ? userData.user?.staking?.filter(
          (staking) =>
            staking.staking.id === '0xA3654801Ba6FB21d5A984F9a857441395dDeccFb'
        )[0]?.staked
      : null;

    const userStakedUSD = userStaked
      ? chainId === 43114 || !chainId
        ? Number(utils.formatEther(BigNumber.from(userStaked))) * orcaUSDPrice
        : Number(utils.formatEther(BigNumber.from(userStaked))) * 0.2
      : null;

    return {
      loading: false,
      data: {
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
