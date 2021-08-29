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
} from '@material-ui/core';
import { TabList, TabPanel, TabContext } from '@material-ui/lab';

import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';
import { AvaxVaults } from './crypto/AVAX';

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

export function Vaults(props) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Default return
  return (
    <Connect title={'Vaults'}>
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
                              color: data.disabled ? 'disabled' : 'inherit',
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
    </Connect>
  );
}

export default Vaults;
