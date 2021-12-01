import { FC } from 'react';

import { Farm } from '../Farm';
import { FarmTokenInfo, ProtocolTokenInfo } from '@orca/shared';
import { useMonitorFarms } from '../../YieldData/getYieldData';

type AvaiProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
  chainId: number;
};

export const AvaiUsdcFarm: FC<AvaiProps> = ({
  account,
  handleChange,
  expanded,
  chainId,
}) => {
  const { loading, data } = useMonitorFarms(
    chainId === 43114 || !chainId
      ? FarmTokenInfo['USDC-AVAI'].address.mainnet.toLowerCase()
      : FarmTokenInfo['USDC-AVAI'].address.fuji.toLowerCase(),
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
      img={FarmTokenInfo['USDC-AVAI'].icon}
      name="USDC-AVAI"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color1={'#2876c9'}
      color2={'#689fd9'}
      farm={FarmTokenInfo['USDC-AVAI'].address.mainnet}
      link={
        'https://app.pangolin.exchange/#/add/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0x346A59146b9b4a77100D369a3d18E8007A9F46a6'
      }
      finished={false}
    />
  );
};
