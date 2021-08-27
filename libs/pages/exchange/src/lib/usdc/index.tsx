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

import { AVALANCHE_TESTNET_PARAMS } from '@orca/util';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

const CollateralStyle = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export function USDCSwap(props) {
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
      <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">Not connected to metamask.</Container>
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
            <CollateralStyle></CollateralStyle>
          </Card>
        </Container>
      </TabContext>
    </RootStyle>
  );
}

export default USDCSwap;
