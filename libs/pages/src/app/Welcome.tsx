import { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Typography, Box, Card, CardContent, Button } from '@mui/material';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Link } from '@orca/components';
import { routes } from '@orca/shared';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.light,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

const Welcome: FC = () => {
  // web3 init info
  const { account, library } = useWeb3React<Web3Provider>();
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: 'grey.800' }}>
          Welcome {account ? 'back' : ''} to Orca Protocol
        </Typography>

        <Typography
          variant="caption"
          color="grey.700"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}
        >
          Explore the Orca DAO and open a vault, borrow the stablecoin AVAI
          using your crypto collateral, completely in your control.
        </Typography>
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          href={routes.APP.VAULTS.USER}
          component={Link}
        >
          Start now!
        </Button>
      </CardContent>

      <Box
        component="img"
        alt="welcome"
        src="/static/illustrations/illustration_seo.svg"
        sx={{
          p: 3,
          width: 360,
          height: '100%',
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
};

export default Welcome;
