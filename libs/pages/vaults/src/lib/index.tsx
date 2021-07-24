/* eslint-disable-next-line */
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { experimentalStyled as styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { Page } from '@ursa/components/page';

import { AvaxVaults } from './crypto/AVAX';
import { JoeVaults } from './crypto/JOE';
import { PngVaults } from './crypto/PNG';

export interface PagesVaultsProps {}

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

const CollateralStyle = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const collaterals = [
  {
    disabled: false,
    icon: '/static/cryptos/ic_avax.svg',
    value: '1',
    component: <AvaxVaults />,
    title: 'AVAX',
  },
  {
    disabled: true,
    icon: '/static/cryptos/ic_png.svg',
    value: '2',
    component: <PngVaults />,
    title: 'PNG',
  },
  {
    disabled: true,
    icon: '/static/cryptos/ic_traderjoe.svg',
    value: '3',
    component: <JoeVaults />,
    title: 'JOE',
  },
];

export function Vaults(props: PagesVaultsProps) {
  const [value, setValue] = useState('1');
  const [valueScrollable, setValueScrollable] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { account, library } = useWeb3React<Web3Provider>();

  if (typeof account !== 'string')
    return (
      <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">Not connected.</Container>
      </RootStyle>
    );
  // Default return
  return (
    <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <TabContext value={value}>
        <Container maxWidth="md">
          <Card
            sx={{
              mb: 3,
              height: 160,
              position: 'relative',
            }}
          >
            <CardHeader
              title={'Choose your vault type'}
              subheader={'This will be used as collateral'}
            />
            <CollateralStyle>
              <TabList onChange={handleChange}>
                {collaterals.map((data) => (
                  <Tab
                    icon={
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={1}
                      >
                        <Box
                          component="img"
                          src={data.icon}
                          sx={{
                            width: 30,
                            height: 30,
                            opacity: data.disabled ? 0.1 : 1,
                          }}
                          color="inherit"
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            color: data.disabled ? 'grey.700' : 'grey.400',
                          }}
                        >
                          {data.title}
                        </Typography>
                      </Stack>
                    }
                    key={data.value}
                    value={data.value}
                    disabled={data.disabled}
                  />
                ))}
              </TabList>
            </CollateralStyle>
          </Card>
          {collaterals.map((data) => (
            <TabPanel key={data.value} value={data.value}>
              {data.component}
            </TabPanel>
          ))}
        </Container>
      </TabContext>
    </RootStyle>
  );
}

export default Vaults;
