/* eslint-disable-next-line */
import { FC } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';

import { Box, Typography, Stack, Container, Button } from '@mui/material';

import { Page } from '@orca/components/page';

import { AVALANCHE_TESTNET_PARAMS } from '@orca/util';

//--------------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

//--------------------------------------------------------------------------

type ConnectProps = {
  title: string;
};

//---------------------------------------------------------------------------
export const Connect: FC<ConnectProps> = ({ children, title }) => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  if (chainId !== 43113) {
    return (
      <RootStyle title={`${title} | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">
          <Box>
            <Stack>
              <Typography
                variant="h1"
                sx={{ textAlign: 'center', mt: 2, mb: 2 }}
              >
                {`${
                  account
                    ? 'Main Net not deployed yet.'
                    : 'Only available on Avalanche.'
                }`}{' '}
                <br />
                {`${
                  account
                    ? 'Please switch to Fuji by clicking below.'
                    : 'Please connect to Fuji by clicking connect.'
                }`}
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
      </RootStyle>
    );
  }

  // Default return
  return <>{children}</>;
};

export default Connect;
