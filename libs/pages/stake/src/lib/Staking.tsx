import { FC } from 'react';

import { Farm } from './Farm';
import { useMonitorFarms } from './StakeData/getYieldData';
import { routes, tokenInfo } from '@orca/shared/base';

type AvaiProps = {
  account: string;
  chainId: number;
};

export const OrcaStaking: FC<AvaiProps> = ({ account, chainId }) => {
  const { loading, data } = useMonitorFarms(account, chainId);

  return (
    <Farm
      reward="AVAX"
      rewardImg={tokenInfo['AVAX'].icon}
      rewardPerDay={data?.rewardPerDay}
      img={tokenInfo['ORCA'].icon}
      name="ORCA"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={'0'}
      color2={'#2BB673'}
      color1={'#158364'}
      farm={
        chainId === 43114
          ? tokenInfo['ORCA'].address.mainnet.toLowerCase()
          : tokenInfo['ORCA'].address.fuji.toLowerCase()
      }
      link={routes.APP.CRYPTOS.ORCA}
    />
  );
};
