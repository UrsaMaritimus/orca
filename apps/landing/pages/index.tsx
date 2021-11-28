import React from 'react';

import { styled } from '@mui/material/styles';

import { Page } from '@orca/components';
import { HomeLayout } from '@orca/layouts';
import { Hero, Footer, Intro, SignUp, SeaFund } from '@orca/pages/landing';

const RootStyle = styled(Page)({
  height: '100%',
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

const Home = () => {
  return (
    <RootStyle title={process.env.NEXT_PUBLIC_TITLE} id={'LandingPage'}>
      <HomeLayout>
        <Hero />
        <ContentStyle>
          <Intro />
          <SeaFund />
          <SignUp />
          <Footer />
        </ContentStyle>
      </HomeLayout>
    </RootStyle>
  );
};

export default Home;
