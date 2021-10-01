import { FC } from 'react';

import { Farm } from '../Farm';
import { useMonitorFarms } from '../../YieldData/getYieldData';
import { routes, tokenInfo } from '@orca/shared/base';

type AvaxProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
};

export const AvaxOrcaFarm: FC<AvaxProps> = ({
  account,
  handleChange,
  expanded,
}) => {
  const { loading, data } = useMonitorFarms(
    tokenInfo['AVAX-ORCA'].address.mainnet.toLowerCase(),
    account
  );

  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="ORCA"
      rewardImg={tokenInfo['ORCA'].icon}
      rewardPerDay={data?.rewardPerDay}
      img={tokenInfo['AVAX-ORCA'].icon}
      name="AVAX-ORCA"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color2={'#FF7F7F'}
      color1={'#E84142'}
      farm={tokenInfo['AVAX-ORCA'].address.mainnet.toLowerCase()}
      link={
        'https://app.pangolin.exchange/#/add/AVAX/0x8B1d98A91F853218ddbb066F20b8c63E782e2430'
      }
    />
  );
};
