import { FC } from 'react';

import { Farm } from '../Farm';
import { useMonitorFarmAvai } from '../../YieldData/getYieldData';
import { routes, farmConstants } from '@orca/shared/base';

type AvaiProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
};

export const AvaiFarm: FC<AvaiProps> = ({
  account,
  handleChange,
  expanded,
}) => {
  const { loading, data } = useMonitorFarmAvai(
    farmConstants.avai.address.toLowerCase(),
    account
  );

  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="ORCA"
      rewardImg={farmConstants.reward.img}
      rewardPerDay={data?.rewardPerDay}
      img={farmConstants.avai.img}
      name="AVAI"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color2={'#2BB673'}
      color1={'#158364'}
      farm={'0x41f8511b889d2e32a889dad14a9eed9c2c737385'}
      link={routes.APP.VAULTS.USER}
    />
  );
};
