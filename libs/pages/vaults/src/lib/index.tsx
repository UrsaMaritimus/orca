/* eslint-disable-next-line */
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Tab,
  Container,
} from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';

import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';
import { AvaxVaults } from './crypto/AVAX';
import { ScrollBar } from '@orca/components/scroll-bar';
import { Loader } from '@orca/components/loader';

//--------------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

const CollateralStyle = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

//--------------------------------------------------------------------------

const collaterals = (
  account: string,
  library: Web3Provider,
  chainId: number
) => [
  {
    disabled: false,
    icon: '/static/cryptos/ic_avax.svg',
    value: '1',
    component: (
      <AvaxVaults account={account} library={library} chainId={chainId} />
    ),
    title: 'AVAX',
  },
  {
    disabled: true,
    icon: '/static/cryptos/ic_eth.svg',
    value: '2',
    component: <> </>,
    title: 'ETH',
  },
  {
    disabled: true,
    icon: '/static/cryptos/ic_wbtc.svg',
    value: '3',
    component: <> </>,
    title: 'BTC',
  },
];

export function Vaults(props) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Default return
  return (
    <Connect title={'Vaults'}>
      <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <TabContext value={value}>
          <Container maxWidth="sm">
            <Card
              sx={{
                mb: 3,
                height: 180,
                position: 'relative',
              }}
            >
              <CardHeader
                title={'Choose your vault type'}
                subheader={'This will be used as collateral'}
              />
              <ScrollBar>
                <CollateralStyle>
                  <TabList
                    onChange={handleChange}
                    scrollButtons="auto"
                    variant="scrollable"
                    allowScrollButtonsMobile
                  >
                    {collaterals(account, library, chainId).map((data) => (
                      <Tab
                        icon={
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            direction="row"
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
                                color: data.disabled ? 'disabled' : 'inherit',
                                ml: 0.5,
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
              </ScrollBar>
            </Card>

            {shouldFetch ? (
              collaterals(account, library, chainId).map((data) => (
                <TabPanel key={data.value} value={data.value}>
                  {data.component}
                </TabPanel>
              ))
            ) : (
              <Card>
                <Loader />
              </Card>
            )}
          </Container>
        </TabContext>
      </RootStyle>
    </Connect>
  );
}

export default Vaults;
