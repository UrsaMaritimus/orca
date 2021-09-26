import { FC } from 'react';

import { Farm } from '../Farm';
import { useMonitorFarmAvai } from '../../YieldData/getYieldData';
import { routes, tokenInfo } from '@orca/shared/base';

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
    // TODO: Change to main net
    tokenInfo['AVAI'].address.fuji.toLowerCase(),
    account
  );

  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="ORCA"
      rewardImg={tokenInfo['ORCA'].icon}
      rewardPerDay={data?.rewardPerDay}
      img={tokenInfo['AVAI'].icon}
      name="AVAI"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color2={'#2BB673'}
      color1={'#158364'}
      // TODO: main net
      farm={tokenInfo['AVAI'].address.fuji.toLowerCase()}
      link={routes.APP.VAULTS.USER}
    />
  );
};
