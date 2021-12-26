import { FC } from 'react';

import { Farm as FarmxOrca } from './xORCA';

import { useMonitorFarms } from './StakeData/getYieldData';
import { routes, BankTokenInfo, ProtocolTokenInfo } from '@orca/shared';

type AvaiProps = {
  account: string;
  chainId: number;
};

export const OrcaStaking: FC<AvaiProps> = ({ account, chainId }) => {
  const { loading, data } = useMonitorFarms(account, chainId);

  return (
    <FarmxOrca
      {...{
        reward: 'AVAX',
        rewardImg: BankTokenInfo['AVAX'].icon,
        rewardPerDay: data?.rewardPerDay,
        img: ProtocolTokenInfo['ORCA'].icon,
        name: 'ORCA',
        tvl: data?.tvl,
        apr: data?.apr,
        loading: loading,
        totalStaked: data?.userStaked,
        totalStakedUSD: data?.userStakedUSD,
        pid: '0',
        color2: '#2BB673',
        color1: '#158364',
        farm:
          chainId === 43114
            ? ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase()
            : ProtocolTokenInfo['ORCA'].address.fuji.toLowerCase(),

        link: routes.APP.CRYPTOS.ORCA,
      }}
    />
  );
};
