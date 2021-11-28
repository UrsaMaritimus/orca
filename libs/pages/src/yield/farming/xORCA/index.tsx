import { FC } from 'react';

import { Farm } from '../Farm';
import { useMonitorFarms } from './getYieldData';
import { routes, FarmTokenInfo, ProtocolTokenInfo } from '@orca/shared';

type AvaxProps = {
  account: string;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
  chainId: number;
};

export const XOrcaFarm: FC<AvaxProps> = ({
  account,
  handleChange,
  expanded,
  chainId,
}) => {
  const { loading, data } = useMonitorFarms(
    chainId === 43114
      ? FarmTokenInfo['XORCA'].address.mainnet.toLowerCase()
      : FarmTokenInfo['XORCA'].address.fuji.toLowerCase(),
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
      img={FarmTokenInfo['XORCA'].icon}
      name="xORCA"
      tvl={data?.tvl}
      apr={data?.apr}
      loading={loading}
      totalStaked={data?.userStaked}
      totalStakedUSD={data?.userStakedUSD}
      pid={data?.id}
      color2={'#fda300'}
      color1={'#a74517'}
      farm={
        chainId === 43114
          ? FarmTokenInfo['XORCA'].address.mainnet.toLowerCase()
          : FarmTokenInfo['XORCA'].address.fuji.toLowerCase()
      }
      link={routes.APP.YIELD.STAKE}
    />
  );
};
