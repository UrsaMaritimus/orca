import React, { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Page } from '@ursa/components/page';
import { Monitor } from '@ursa/pages/monitor';
import { AppLayout } from '@ursa/layout/app';

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
