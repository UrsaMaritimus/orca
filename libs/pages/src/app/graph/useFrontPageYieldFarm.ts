import { BigNumber, utils } from 'ethers';

import { tokenInfo } from '@orca/shared';

import {
  useGeneralYieldInfoQuery,
  useGetTokenDataQuery,
  useAvaxPriceQuery,
  useGetTokenPriceQuery,
} from '@orca/graphql';
import { xORCARatioNoWeb3 } from '@orca/web3';

import useSWR from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

export const useFrontPageYieldInfo = (farm: string) => {
  const { data: yieldData } = useGeneralYieldInfoQuery({
    variables: {
      pair: farm.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: tokenData } = useGetTokenDataQuery({
    variables: {
      id: farm.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: orcaPrice } = useGetTokenPriceQuery({
    variables: {
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: avaxPrice } = useAvaxPriceQuery({ pollInterval: 5000 });

  const { data: xOrcaRatio, mutate: mutatexORCARatio } = useSWR(
    [`xOrcaRatioNoWeb3`],
    xORCARatioNoWeb3()
  );
  useKeepSWRDataLiveAsBlocksArrive(mutatexORCARatio);

  if (yieldData && tokenData && orcaPrice && avaxPrice && xOrcaRatio) {
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

    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    const TVL =
      farm.toLowerCase() === tokenInfo['XORCA'].address.mainnet.toLowerCase() ||
      farm.toLowerCase() === tokenInfo['XORCA'].address.fuji.toLowerCase()
        ? totalStaked * orcaUSDPrice * xOrcaRatio.ratio
        : (totalStaked / tokenData.pairs[0].totalSupply) *
          tokenData.pairs[0].reserveUSD;

    const apr = ((rewardPerDay * 36500) / TVL) * orcaUSDPrice;

    return {
      loading: false,
      data: {
        id: utils.formatUnits(yieldData.pools[0]?.id || 0, 0),
        rewardPerDay: rewardPerDay,
        tvl: TVL,
        apr: apr,
        treasury:
          farm.toLowerCase() ===
            tokenInfo['XORCA'].address.mainnet.toLowerCase() ||
          farm.toLowerCase() === tokenInfo['XORCA'].address.fuji.toLowerCase()
            ? 0
            : Number(
                utils.formatEther(
                  BigNumber.from(yieldData.pools[0]?.treasuryAmount || 0)
                )
              ) *
              (farm === tokenInfo['AVAI'].address.fuji.toLowerCase()
                ? 1
                : tokenData.pairs[0].reserveUSD /
                  tokenData.pairs[0].totalSupply),
      },
    };
  } else {
    return { loading: true };
  }
};
