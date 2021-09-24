import { FC } from 'react';

import { Farm } from '../Farm';
import { farmConstants } from '@orca/shared/base';
import { useMonitorFarms } from '../../YieldData/getYieldData';

type AvaiProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
};

export const AvaiUsdcFarm: FC<AvaiProps> = ({
  account,
  handleChange,
  expanded,
}) => {
  const { loading, data } = useMonitorFarms(
    farmConstants.usdcAvai.address.toLowerCase(),
    account
  );
  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="ORCA"
      rewardImg={farmConstants.reward.img}
      rewardPerDay={data?.rewardPerDay}
      img={farmConstants.usdcAvai.img}
      name="USDC-AVAI"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color1={'#2876c9'}
      color2={'#689fd9'}
      farm={'0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'}
      link={
        'https://app.pangolin.exchange/#/add/0x41f8511b889D2e32A889DAD14a9EeD9c2c737385/0xC1517ac40949643188efF133E2d4d6954eb23378'
      }
    />
  );
};
