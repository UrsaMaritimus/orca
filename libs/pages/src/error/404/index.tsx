import { FC } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

import { Box, Button, Typography, Container } from '@mui/material';

import {
  Page,
  varBounceIn,
  MotionContainer,
  Logo,
  NextLink,
} from '@orca/components';
import { routes } from '@orca/shared/base';

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

const Page404View: FC = () => {
  return (
    <RootStyle title={`404 Page Not Found | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <HeaderStyle>
        <NextLink href={routes.APP.ROOT}>
          <Logo />
        </NextLink>
      </HeaderStyle>

      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" gutterBottom>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Box
              component={motion.img}
              variants={varBounceIn}
              alt="404"
              src="/static/illustrations/illustration_404.svg"
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
        </MotionContainer>
      </Container>
    </RootStyle>
  );
};

export default Page404View;
