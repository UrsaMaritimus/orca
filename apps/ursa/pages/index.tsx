import React, { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Page } from '@ursa/components/page';
import { AppPage } from '@ursa/pages/app';
import { AppLayout } from '@ursa/layout/app';

const RootStyle = styled(Page)((theme) => ({
  root: {},
}));

const App: FC = () => {
  return (
    <RootStyle
      title={`Dashboard | ${process.env.NEXT_PUBLIC_TITLE}`}
      id={'AppPage'}
    >
      <AppLayout>
        <AppPage />
      </AppLayout>
    </RootStyle>
  );
};

export default App;
