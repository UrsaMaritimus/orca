import React, { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Page } from '@orca/components/page';
import { Monitor } from '@orca/pages/monitor';
import { AppLayout } from '@orca/layout/app';

const RootStyle = styled(Page)((theme) => ({
  root: {},
}));

const App: FC = () => {
  return (
    <RootStyle
      title={`Monitor Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}
      id={'MonitorPage'}
    >
      <AppLayout>
        <Monitor />
      </AppLayout>
    </RootStyle>
  );
};

export default App;
