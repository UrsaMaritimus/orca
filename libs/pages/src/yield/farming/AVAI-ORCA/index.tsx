import { FC } from 'react';

import { Farm } from '../Farm';
import { useMonitorFarms } from '../../YieldData/getYieldData';
import { FarmTokenInfo, ProtocolTokenInfo } from '@orca/shared';

type AvaiProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
  chainId: number;
};

export const AvaiOrcaFarm: FC<AvaiProps> = ({
  account,
  handleChange,
  expanded,
  chainId,
}) => {
  const { loading, data } = useMonitorFarms(
    FarmTokenInfo['AVAI-ORCA'].address.mainnet.toLowerCase(),
    account,
    chainId
  );

  return (
    <Farm
      handleChange={handleChange}
      expanded={expanded}
      reward="ORCA"
      rewardImg={ProtocolTokenInfo['ORCA'].icon}
      rewardPerDay={data?.rewardPerDay}
      img={FarmTokenInfo['AVAI-ORCA'].icon}
      name="AVAI-ORCA"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color2={'#2BB673'}
      color1={'#158364'}
      farm={FarmTokenInfo['AVAI-ORCA'].address.mainnet.toLowerCase()}
      link={
        'https://app.pangolin.exchange/#/add/0x8B1d98A91F853218ddbb066F20b8c63E782e2430/0x346A59146b9b4a77100D369a3d18E8007A9F46a6'
      }
    />
  );
};
