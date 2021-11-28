import { FC, useState } from 'react';

import { Farm as FarmxOrca } from './xORCA';
import { Farm } from './Farm';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Container, Card } from '@mui/material';
import { useMonitorFarms } from './StakeData/getYieldData';
import { routes, BankTokenInfo, ProtocolTokenInfo } from '@orca/shared';

type AvaiProps = {
  account: string;
  chainId: number;
};

const SIMPLE_TAB = [
  {
    value: '1',
    component: (props: {
      img: string;
      name: string;
      rewardPerDay: number;
      reward: string;
      rewardImg: string;
      tvl: number;
      apr: number;
      loading: boolean;
      totalStaked: string;
      totalStakedUSD: number;
      color1: string;
      color2: string;
      farm: string;
      link: string;
      pid: string;
    }) => <FarmxOrca {...props} />,
    label: 'xORCA Staking',
    disabled: false,
  },
  {
    value: '2',
    component: (props: {
      img: string;
      name: string;
      rewardPerDay: number;
      reward: string;
      rewardImg: string;
      tvl: number;
      apr: number;
      loading: boolean;
      totalStaked: string;
      totalStakedUSD: number;
      color1: string;
      color2: string;
      farm: string;
      link: string;
      pid: string;
    }) => <Farm {...props} />,
    label: 'Old Staking',
    disabled: false,
  },
];

export const OrcaStaking: FC<AvaiProps> = ({ account, chainId }) => {
  const { loading, data } = useMonitorFarms(account, chainId);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Container maxWidth="xs">
        <Card sx={{ overflow: 'unset', position: 'unset', width: '100%' }}>
          <Box
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              '& > *': { mx: '8px !important' },
            }}
          >
            <TabList onChange={handleChange}>
              {SIMPLE_TAB.map((tab, index) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={String(index + 1)}
                />
              ))}
            </TabList>
          </Box>
        </Card>
      </Container>
      {SIMPLE_TAB.map((panel, index) => (
        <TabPanel key={panel.value} value={String(index + 1)}>
          {panel.component({
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
          })}
        </TabPanel>
      ))}
    </TabContext>
  );
};
