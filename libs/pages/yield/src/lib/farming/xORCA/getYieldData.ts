import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared/base';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import useSWR from 'swr';
import contracts from '@orca/shared/deployments';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import {
  useGeneralYieldInfoQuery,
  useGetTokenDataQuery,
  useUserStakedQuery,
  useAvaxPriceQuery,
  useGetTokenPriceQuery,
} from '@orca/graphql';
import { xORCARatio } from '@orca/shared/funcs';

export const useMonitorFarms = (
  farm: string,
  account: string,
  chainId: number
) => {
  const { library } = useWeb3React<Web3Provider>();
  const { data: yieldData } = useGeneralYieldInfoQuery({
    variables: {
      pair: farm,
    },
    pollInterval: 5000,
  });

  const { data: userData } = useUserStakedQuery({
    variables: {
      id: account ? account.toLowerCase() : '',
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

  const { data: avaxPrice } = useAvaxPriceQuery({ pollInterval: 5000 });

  const shouldFetch = !!library;
  const { data: xOrcaRatio, mutate: mutatexORCARatio } = useSWR(
    shouldFetch ? [`xOrcaRatioFarm`, library, chainId] : null,
    xORCARatio()
  );

  useKeepSWRDataLiveAsBlocksArrive(mutatexORCARatio);
  if (
    yieldData &&
    yieldData.pools[0] &&
    userData &&
    orcaPrice &&
    avaxPrice &&
    xOrcaRatio
  ) {
    const poolAlloc = Number(yieldData.pools[0].allocPoint);
    const totalAllocPoints = Number(
      yieldData.pools[0]?.leader?.totalAllocPoints
    );
    const orcaPerSec = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0].leader.orcaPerSec))
    );
    const totalStaked = Number(
      utils.formatEther(BigNumber.from(yieldData.pools[0].totalStaked))
    );

    const rewardPerDay = (poolAlloc / totalAllocPoints) * orcaPerSec * 86400;

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice =
      chainId === 43114 || !chainId
        ? Number(orcaPrice.token?.derivedETH) * avaxUSDPrice
        : 0.2;
    const TVL = totalStaked * xOrcaRatio.ratio * orcaUSDPrice;
    const apr =
      chainId === 43114 || !chainId
        ? ((rewardPerDay * 36500) / TVL) * orcaUSDPrice
        : ((rewardPerDay * 36500) / TVL) * 0.2;

    const userStaked = account
      ? userData.user?.pools?.filter((pool) => pool.pool?.pair === farm)[0]
          ?.staked
      : null;

    const userStakedUSD = userStaked
      ? Number(utils.formatEther(BigNumber.from(userStaked))) *
        xOrcaRatio.ratio *
        orcaUSDPrice
      : null;

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0]?.id, 0),
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
  const { data: yieldData } = useGeneralYieldInfoQuery({
    variables: {
      pair: farm,
    },
  });

  const { data: userData } = useUserStakedQuery({
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
