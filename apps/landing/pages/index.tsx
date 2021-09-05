import React from 'react';

import { styled } from '@mui/material/styles';

import { Page } from '@orca/components/page';
import { HomeLayout } from '@orca/layout/landing';
import { Hero, Footer, Intro, SignUp } from '@orca/pages/landing';

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
          <SignUp />
          <Footer />
        </ContentStyle>
      </HomeLayout>
    </RootStyle>
  );
};

export default Home;
