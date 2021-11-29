import { FC } from 'react';

import { ProtocolTokenInfo } from '@orca/shared';
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
    ProtocolTokenInfo['STORM'].address.mainnet
  );

  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="STORM"
      rewardImg={ProtocolTokenInfo['STORM'].icon}
      rewardPerDay={data?.rewardPerDay}
      img={ProtocolTokenInfo['ORCA'].icon}
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
          ? ProtocolTokenInfo['ORCA'].address.mainnet.toLowerCase()
          : ProtocolTokenInfo['STORM'].address.fuji.toLowerCase()
      }
      link={
        'https://app.pangolin.exchange/#/add/0x8B1d98A91F853218ddbb066F20b8c63E782e2430/0x346A59146b9b4a77100D369a3d18E8007A9F46a6'
      }
      finished={true}
    />
  );
};
