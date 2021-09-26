import { BigNumber, utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';
import { useOrcaStatsSubscription, useOrcaPerSecQuery } from '@orca/graphql';

import { useFrontPageYieldInfo } from './useFrontPageYieldFarm';
import { useFrontPageInfo } from './useFrontPageAnalytics';

export const useFrontPageStats = () => {
  const { loading, data } = useOrcaStatsSubscription({
    variables: {
      // #TODO: Change to main net
      id: tokenInfo['ORCA'].address.fuji.toLowerCase(),
    },
  });

  const { loading: bankLoading, data: bankData } = useFrontPageInfo();

  const { data: orcaPerSec, loading: orcaPerLoading } = useOrcaPerSecQuery();

  // Do this manually. Tedious tbh...
  const { loading: avaiLoading, data: avaiFarm } = useFrontPageYieldInfo(
    // #TODO: Change to main net
    tokenInfo['AVAI'].address.fuji.toLowerCase()
  );
  const { loading: usdcLoading, data: usdcFarm } = useFrontPageYieldInfo(
    // #TODO: Change to main net
    tokenInfo['USDC-AVAI'].address.fuji.toLowerCase()
  );

  if (
    !loading &&
    !bankLoading &&
    !orcaPerLoading &&
    !usdcLoading &&
    !avaiLoading
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
    const TVL = avaiFarm.tvl + usdcFarm.tvl + bankTVL;

    return {
      loading: false,
      data: {
        maxSupply,
        circulatingSupply,
        //TODO: Adjust for actual price
        marketcap: 0.2 * circulatingSupply,
        totalRevenue:
          Number(utils.formatUnits(bankData.exchangeTreasury, 6)) +
          Number(utils.formatEther(bankData.bankTreasury)) +
          avaiFarm.treasury +
          usdcFarm.treasury,
        orcaPerDay: orcaPerSecond * 60 * 60 * 24,
        orcaPerMonth: orcaPerSecond * 60 * 60 * 24 * 30,
        TVL,
      },
    };
  } else {
    return { loading: true };
  }
};
