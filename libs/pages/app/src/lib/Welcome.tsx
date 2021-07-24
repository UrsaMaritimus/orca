import { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Typography, Box, Card, CardContent } from '@material-ui/core';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.up('xl')]: { height: 320 },
}));

// ----------------------------------------------------------------------

const Welcome: FC = () => {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: 'grey.800' }}>
          Welcome back
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'grey.800',
            pb: { xs: 3, xl: 5 },
          }}
        >
          {
            'Some type of intro here. Perhaps a link to continue from where they last were?'
          }
        </Typography>
      </CardContent>

      <Box
        component="img"
        alt="welcome"
        src="/static/illustrations/illustration_seo.svg"
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
};

export default Welcome;
