import { FC } from 'react';

import { routes, tokenInfo } from '@orca/shared/base';
import { Farm } from '../Farm';
import { useMonitorFarms } from '../PartnerData';
type AvaiProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
  chainId: number;
};

export const StormStaking: FC<AvaiProps> = ({
  account,
  chainId,
  handleChange,
  expanded,
}) => {
  const { loading, data } = useMonitorFarms(
    account,
    chainId,
    tokenInfo['STORM'].address.mainnet
  );

  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="STORM"
      rewardImg={tokenInfo['STORM'].icon}
      rewardPerDay={data?.rewardPerDay}
      img={tokenInfo['ORCA'].icon}
      name="ORCA"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      contractName={'StormSingleStaking'}
      color2={'#6fa3ff'}
      color1={'#054dcc'}
      farm={
        chainId === 43114
          ? tokenInfo['ORCA'].address.mainnet.toLowerCase()
          : tokenInfo['STORM'].address.fuji.toLowerCase()
      }
      link={
        'https://app.pangolin.exchange/#/add/0x8B1d98A91F853218ddbb066F20b8c63E782e2430/0x346A59146b9b4a77100D369a3d18E8007A9F46a6'
      }
    />
  );
};
