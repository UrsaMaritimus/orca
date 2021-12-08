import { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Box, Typography, Container, Button, Link } from '@mui/material';
import { m } from 'framer-motion';

import { varFadeInDown, varFadeInUp, MotionInView } from '@orca/components';
import { routes } from '@orca/shared';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

const SignUp: FC = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 15 }}>
      <ContentStyle>
        <MotionInView variants={varFadeInUp} sx={{ mb: { xs: 3, md: 0 } }}>
          <m.div
            animate={{ y: [-20, 0, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Box
              component="img"
              alt="rocket"
              src={'/static/illustrations/rocket.svg'}
              srcSet={`${'/static/illustrations/rocket.svg'} 600w, ${'/static/illustrations/rocket.svg'} 960w`}
              sx={{
                zIndex: 9,
                width: '90%',
                height: '90%',
                marginRight: '200px',
                marginLeft: '50px',
                maxWidth: 460,
                transform: {
                  xs: 'translateX(-10%)',
                  md: 'translateX(0)',
                },
              }}
            />
          </m.div>
        </MotionInView>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <MotionInView
            variants={varFadeInDown}
            sx={{ color: 'common.white', mb: 5 }}
          >
            {
              <Typography variant="h2">
                Get started with
                <br /> the OrcaDAO
              </Typography>
            }
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Button
              size="large"
              variant="contained"
              component={Link}
              href={routes.LANDING.SITE}
              target={'_blank'}
              sx={{
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.common.white),
                bgcolor: 'common.white',
                '&:hover': { bgcolor: 'grey.300' },
              }}
            >
              Go to app now!
            </Button>
          </MotionInView>
        </Box>
      </ContentStyle>
    </Container>
  );
};

export default SignUp;
