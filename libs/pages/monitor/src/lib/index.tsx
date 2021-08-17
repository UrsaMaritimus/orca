/* eslint-disable-next-line */
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Tab,
  Container,
  Button,
} from '@material-ui/core';
import { TabList, TabPanel, TabContext } from '@material-ui/lab';

import { Page } from '@orca/components/page';

import { AvaxVaults } from './crypto/AVAX';

import { AVALANCHE_TESTNET_PARAMS } from '@orca/util';

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
    component: <> </>,
    title: 'PNG',
  },
  {
    disabled: true,
    icon: '/static/cryptos/ic_traderjoe.svg',
    value: '3',
    component: <> </>,
    title: 'JOE',
  },
];

export function Vaults(props: PagesVaultsProps) {
  const [value, setValue] = useState('1');
  const [valueScrollable, setValueScrollable] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { account, library, chainId } = useWeb3React<Web3Provider>();

  if (chainId === 43114) {
    return (
      <Container maxWidth="md">
        <Box>
          <Stack>
            <Typography variant="h1" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
              {' '}
              Main Net not deployed yet. Please switch to Fuji.
            </Typography>

            {library && (
              <Button
                sx={{ m: 'auto' }}
                size="large"
                variant="contained"
                onClick={() => {
                  library.provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [AVALANCHE_TESTNET_PARAMS],
                  });
                }}
              >
                Add FUJI Network
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    );
  }

  if (typeof account !== 'string')
    return (
      <RootStyle title={`Monitor Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">Not connected.</Container>
      </RootStyle>
    );
  // Default return
  return (
    <RootStyle title={`Monitor Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
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
              title={'Choose vault type to monitor'}
              subheader={'This is the type of collateral used'}
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
