import { FC } from 'react';

import { Icon } from '@iconify/react';

import flashFill from '@iconify/icons-eva/flash-fill';

import { motion } from 'framer-motion';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Box, Typography, Container, Button, Link } from '@material-ui/core';

import {
  varFadeIn,
  varWrapEnter,
  varFadeInRight,
} from '@ursa/components/animate';

import { routes } from '@ursa/shared/base';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
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
  zIndex: 10,
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

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

const Hero: FC = () => {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle
          src="/static/images/overlay.svg"
          variants={varFadeIn}
          alt="overlay"
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Box
                component="h1"
                sx={{ typography: 'h1', color: 'common.white' }}
              >
                Use your
                <br />
                crypto assets <br /> with
                <Typography component="span" variant="h1" color="primary">
                  &nbsp;AVAI Finance
                </Typography>{' '}
                and the{' '}
                <Typography component="span" variant="h1" color="secondary">
                  Orca DAO
                </Typography>
              </Box>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Box component="p" sx={{ color: 'common.white', py: 5 }}>
                Collateral-backed stablecoin that lets you take 0% interest
                loans, all controlled by the avalanche community!
              </Box>
            </motion.div>

            <motion.div variants={varFadeInRight}>
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
            </motion.div>

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
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
};

export default Hero;
