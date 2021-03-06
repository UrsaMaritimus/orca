import { FC } from 'react';

import Image from 'next/image';
import { Icon } from '@iconify/react';

import flashFill from '@iconify/icons-eva/flash-fill';

import { m, LazyMotion } from 'framer-motion';
import { styled } from '@mui/material/styles';

import { Box, Typography, Container, Button, Link } from '@mui/material';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInRight,
  loadFeatures,
} from '@orca/components';

import { routes } from '@orca/shared';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#F2F3F5',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  zIndex: 111,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 10,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledImage = styled(Image)({
  position: 'relative',
  filter: 'blur(6px)',
  zIndex: 10,
  top: 250,
});

// ----------------------------------------------------------------------

const Hero: FC = () => {
  return (
    <>
      <LazyMotion features={loadFeatures}>
        <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
          <HeroOverlayStyle
            src="/static/images/overlay.png"
            variants={varFadeIn}
            alt="overlay"
          />

          <StyledImage src="/static/images/hero.svg" layout="fill" />
          <Container maxWidth="lg">
            <ContentStyle>
              <m.div variants={varFadeInRight}>
                <Box
                  component="h1"
                  sx={{ typography: 'h1', color: 'common.white' }}
                >
                  Finance Your Inner Whale
                </Box>
              </m.div>

              <m.div variants={varFadeInRight}>
                <Box component="p" sx={{ color: 'common.white', py: 5 }}>
                  <Typography component="span" variant="h5" color="secondary">
                    OrcaDAO
                  </Typography>{' '}
                  is a protocol featuring the Avalanche-native stablecoin
                  <Typography component="span" variant="h5" color="primary">
                    &nbsp;AVAI
                  </Typography>{' '}
                  and governance token{' '}
                  <Typography component="span" variant="h5" color="primary">
                    ORCA
                  </Typography>{' '}
                  that allow for lending using crypto collateral at 0% interest,
                  built on and for the Avalanche Network.
                </Box>
              </m.div>

              <m.div variants={varFadeInRight}>
                <Button
                  size="large"
                  variant="contained"
                  target={'_blank'}
                  component={Link}
                  href={routes.LANDING.SITE}
                  startIcon={<Icon icon={flashFill} width={20} height={20} />}
                >
                  Go to app!
                </Button>
              </m.div>

              <Box
                sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'left' },
                  '& > *:not(:last-of-type)': { mr: 1.5 },
                }}
              ></Box>
            </ContentStyle>
          </Container>
        </RootStyle>
      </LazyMotion>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
};

export default Hero;
