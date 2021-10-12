import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';
import {
  useOrcaStatsSubscription,
  useOrcaPerSecQuery,
  useGetTokenPriceSubscription,
  useAvaxPriceSubscription,
  useGeneralStakingInfoSubscription,
} from '@orca/graphql';

import { useFrontPageYieldInfo } from './useFrontPageYieldFarm';
import { useFrontPageInfo } from './useFrontPageAnalytics';

export const useFrontPageStats = () => {
  const { loading, data } = useOrcaStatsSubscription({
    variables: {
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const { loading: bankLoading, data: bankData } = useFrontPageInfo();

  const { data: orcaPerSec, loading: orcaPerLoading } = useOrcaPerSecQuery();

  // Do this manually. Tedious tbh...
  const { loading: orcaLoading, data: orcaFarm } = useFrontPageYieldInfo(
    tokenInfo['AVAI-ORCA'].address.mainnet.toLowerCase()
  );
  const { loading: usdcLoading, data: usdcFarm } = useFrontPageYieldInfo(
    tokenInfo['USDC-AVAI'].address.mainnet.toLowerCase()
  );

  const { loading: avaxLoading, data: avaxFarm } = useFrontPageYieldInfo(
    tokenInfo['AVAX-ORCA'].address.mainnet.toLowerCase()
  );

  const { data: yieldData } = useGeneralStakingInfoSubscription();

  const { data: orcaPrice } = useGetTokenPriceSubscription({
    variables: {
      id: tokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
  });

  const { data: avaxPrice } = useAvaxPriceSubscription();

  if (
    !loading &&
    !bankLoading &&
    !orcaPerLoading &&
    !usdcLoading &&
    !orcaLoading &&
    !avaxLoading &&
    orcaPrice &&
    avaxPrice &&
    yieldData
  ) {
    const circulatingSupply = Number(
      utils.formatEther(BigNumber.from(data.orca.circulatingSupply))
    );
    const maxSupply = Number(
      utils.formatEther(BigNumber.from(data.orca.maxSupply))
    );
    const orcaPerSecond = Number(
      utils.formatEther(BigNumber.from(orcaPerSec.podLeaders[0].orcaPerSec))
    );
    const bankTVL = Number(utils.formatEther(bankData.totalCollateral));
    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    const stakingTvl = Number(
      utils.formatEther(BigNumber.from(yieldData.stakings[0].totalStaked))
    );

    const TVL =
      orcaFarm.tvl +
      usdcFarm.tvl +
      avaxFarm.tvl +
      bankTVL +
      Number(utils.formatUnits(bankData.exchangeTVL, 6)) +
      stakingTvl;

    return {
      loading: false,
      data: {
        maxSupply,
        circulatingSupply,
        marketcap: orcaUSDPrice * circulatingSupply,
        totalRevenue:
          Number(utils.formatUnits(bankData.exchangeTreasury, 6)) +
          Number(utils.formatEther(bankData.bankTreasury)) +
          orcaFarm.treasury +
          usdcFarm.treasury +
          avaxFarm.treasury,
        orcaPerDay: orcaPerSecond * 60 * 60 * 24,
        orcaPerMonth: orcaPerSecond * 60 * 60 * 24 * 30,
        TVL,
      },
    };
  } else {
    return { loading: true };
  }
};
