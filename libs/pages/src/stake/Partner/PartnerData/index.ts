import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import {
  usePartnerStakingInfoQuery,
  useUserStakingInfoQuery,
  useAvaxPriceQuery,
  useGetTokenPriceQuery,
} from '@orca/graphql';

export const useMonitorFarms = (
  account: string,
  chainId: number,
  token: string
) => {
  const { data: yieldData } = usePartnerStakingInfoQuery({
    variables: {
      id: token.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: userData } = useUserStakingInfoQuery({
    variables: {
      id: account ? account.toLowerCase() : '',
    },
    pollInterval: 5000,
  });

  const { data: partnerPrice } = useGetTokenPriceQuery({
    variables: {
      id: tokenInfo['STORM'].address.mainnet,
    },
    pollInterval: 5000,
  });

  const { data: orcaPrice } = useGetTokenPriceQuery({
    variables: {
      id:
        chainId === 43114 || !chainId
          ? tokenInfo['ORCA'].address.mainnet.toLowerCase()
          : tokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: avaxPrice } = useAvaxPriceQuery({
    pollInterval: 5000,
  });

  if (yieldData && userData && partnerPrice && avaxPrice && orcaPrice) {
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
