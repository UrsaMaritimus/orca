import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

import { Page } from '@orca/components';
import { AppPage } from '@orca/pages';
import { AppLayout } from '@orca/layouts';

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
