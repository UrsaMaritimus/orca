/* eslint-disable-next-line */
import { FC } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';

import { Box, Typography, Stack, Container } from '@mui/material';

import { Page } from '../page';
import { Loader } from '../loader';

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
  const { chainId } = useWeb3React<Web3Provider>();
  if (!chainId) {
    return <Loader />;
  }
  if (chainId !== 43113 && chainId !== 43114) {
    return (
      <RootStyle title={`${title} | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">
          <Box>
            <Stack>
              <Typography
                variant="h1"
                sx={{ textAlign: 'center', mt: 2, mb: 2 }}
              >
                {`${'Only available on Avalanche.'}`} <br />
                Please connect to Avalanche by clicking connect.
              </Typography>
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
