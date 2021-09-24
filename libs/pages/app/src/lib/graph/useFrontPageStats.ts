import { BigNumber, utils } from 'ethers';
import { farmConstants } from '@orca/shared/base';
import {
  useOrcaStatsSubscription,
  useBankInfoFrontPageSubscription,
  useExchangeInfoFrontPageSubscription,
  useOrcaPerSecQuery,
  useGeneralYieldInfoSubscription,
} from '@orca/graphql';
import { useFrontPageYieldInfo } from './useFrontPageYieldFarm';
import { useFrontPageInfo } from './useFrontPageAnalytics';

export const useFrontPageStats = () => {
  const { loading, data } = useOrcaStatsSubscription({
    variables: {
      id: farmConstants.reward.address,
    },
  });

  const { loading: bankLoading, data: bankData } = useFrontPageInfo();

  const { data: orcaPerSec, loading: orcaPerLoading } = useOrcaPerSecQuery();

  // Do this manually. Tedious tbh...
  const { loading: avaiLoading, data: avaiFarm } = useFrontPageYieldInfo(
    farmConstants.avai.address
  );
  const { loading: usdcLoading, data: usdcFarm } = useFrontPageYieldInfo(
    farmConstants.usdcAvai.address
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
          Number(utils.formatEther(bankData.bankTreasury)),
        orcaPerDay: orcaPerSecond * 60 * 60 * 24,
        orcaPerMonth: orcaPerSecond * 60 * 60 * 24 * 30,
        TVL,
      },
    };
  } else {
    return { loading: true };
  }
};
