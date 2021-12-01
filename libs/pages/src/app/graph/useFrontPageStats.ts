import { BigNumber, utils } from 'ethers';
import { ProtocolTokenInfo, FarmTokenInfo } from '@orca/shared';
import {
  useOrcaStatsQuery,
  useOrcaPerSecQuery,
  useGetTokenPriceQuery,
  useAvaxPriceQuery,
  useGeneralStakingInfoQuery,
} from '@orca/graphql';

import { useFrontPageYieldInfo } from './useFrontPageYieldFarm';
import { useFrontPageInfo } from './useFrontPageAnalytics';

export const useFrontPageStats = () => {
  const { loading, data } = useOrcaStatsQuery({
    variables: {
      id: ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { loading: bankLoading, data: bankData } = useFrontPageInfo();

  const { data: orcaPerSec, loading: orcaPerLoading } = useOrcaPerSecQuery({
    pollInterval: 5000,
  });

  const { loading: usdcLoading, data: usdcFarm } = useFrontPageYieldInfo(
    FarmTokenInfo['USDC-AVAI'].address.mainnet.toLowerCase()
  );

  const { loading: avaxLoading, data: avaxFarm } = useFrontPageYieldInfo(
    FarmTokenInfo['AVAX-ORCA'].address.mainnet.toLowerCase()
  );

  const { data: yieldData } = useGeneralStakingInfoQuery({
    pollInterval: 5000,
  });

  const { data: orcaPrice } = useGetTokenPriceQuery({
    variables: {
      id: ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase(),
    },
    pollInterval: 5000,
  });

  const { data: avaxPrice } = useAvaxPriceQuery({ pollInterval: 5000 });

  if (
    !loading &&
    !bankLoading &&
    !orcaPerLoading &&
    !usdcLoading &&
    !avaxLoading &&
    orcaPrice &&
    avaxPrice &&
    yieldData
  ) {
    const circulatingSupply = Number(
      utils.formatEther(BigNumber.from(data.orca?.circulatingSupply || 0))
    );
    const maxSupply = Number(
      utils.formatEther(BigNumber.from(data.orca?.maxSupply || 0))
    );
    const orcaPerSecond = Number(
      utils.formatEther(BigNumber.from(orcaPerSec.podLeaders[0].orcaPerSec))
    );
    const bankTVL = Number(utils.formatEther(bankData.totalCollateral));
    const avaxUSDPrice = Number(avaxPrice.bundle?.ethPrice);
    const orcaUSDPrice = Number(orcaPrice.token?.derivedETH) * avaxUSDPrice;

    const stakingTvl =
      Number(utils.formatEther(BigNumber.from(yieldData.staking.totalStaked))) *
      orcaUSDPrice;

    const TVL =
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
