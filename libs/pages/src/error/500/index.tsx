import { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Box, Button, Typography, Container } from '@mui/material';

import { Page, Logo, NextLink } from '@orca/components';
import { routes } from '@orca/shared';

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(5, 5, 0) },
}));

// ----------------------------------------------------------------------

const Page500View: FC = () => {
  return (
    <RootStyle
      title={`500 Internal Server Error | ${process.env.NEXT_PUBLIC_TITLE}`}
    >
      <HeaderStyle>
        <NextLink href={routes.APP.ROOT}>
          <Logo />
        </NextLink>
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            500 Internal Server Error
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>

          <Box
            component="img"
            alt="500"
            src="/static/illustrations/illustration_500.svg"
            sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
          />

          <Button
            href={routes.APP.ROOT}
            size="large"
            variant="contained"
            component={NextLink}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default Page500View;
