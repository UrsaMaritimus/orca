import { utils } from 'ethers';
import { tokenInfo } from '@orca/shared/base';

import { useFrontPageYieldInfo } from './useFrontPageYieldFarm';
import { useFrontPageInfo } from './useFrontPageAnalytics';

export const useFrontPageStats = () => {
  const { loading: bankLoading, data: bankData } = useFrontPageInfo();

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

  const initialTime = 1633046400;
  const currentTime = Date.now() / 1000;
  if (!bankLoading && !usdcLoading && !orcaLoading && !avaxLoading) {
    return {
      loading: false,
      data: {
        totalRevenue:
          Number(utils.formatUnits(bankData.exchangeTreasury, 6)) +
          Number(utils.formatEther(bankData.bankTreasury)) +
          orcaFarm.treasury +
          usdcFarm.treasury +
          avaxFarm.treasury,
        days: (currentTime - initialTime) / 86400,
      },
    };
  } else {
    return { loading: true };
  }
};
