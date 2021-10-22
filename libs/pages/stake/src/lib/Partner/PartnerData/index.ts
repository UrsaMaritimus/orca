import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import {
  usePartnerStakingInfoSubscription,
  useUserStakingInfoSubscription,
  useAvaxPriceSubscription,
  useGetTokenPriceSubscription,
} from '@orca/graphql';

export const useMonitorFarms = (
  account: string,
  chainId: number,
  token: string
) => {
  const { data: yieldData } = usePartnerStakingInfoSubscription({
    variables: {
      id: token.toLowerCase(),
    },
  });

  const { data: userData } = useUserStakingInfoSubscription({
    variables: {
      id: account ? account.toLowerCase() : '',
    },
  });

  const { data: partnerPrice } = useGetTokenPriceSubscription({
    variables: {
      id: tokenInfo['STORM'].address.mainnet,
    },
  });

  const { data: orcaPrice } = useGetTokenPriceSubscription({
    variables: {
      id:
        chainId === 43114 || !chainId
          ? tokenInfo['ORCA'].address.mainnet.toLowerCase()
          : tokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();

  if (yieldData && userData && partnerPrice && avaxPrice) {
    const avaxPerSec = Number(
      utils.formatEther(BigNumber.from(yieldData.staking.avaxPerSec))
    );
    const totalStaked = Number(
      utils.formatEther(BigNumber.from(yieldData.staking.totalStaked))
    );

    const rewardPerDay = avaxPerSec * 86400;

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const partnerUSDPrice =
      Number(partnerPrice.token?.derivedETH) * avaxUSDPrice;

    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    const TVL =
      chainId === 43114 || !chainId
        ? totalStaked * orcaUSDPrice
        : totalStaked * 0.2;

    const apr = ((rewardPerDay * 36500) / TVL) * partnerUSDPrice;

    const userStaked = account
      ? userData.user?.staking?.filter(
          (staking) => staking.staking.id === token
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
