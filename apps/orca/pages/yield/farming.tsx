import React, { FC } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Page } from '@orca/components/page';
import { Farming } from '@orca/pages/yield';
import { AppLayout } from '@orca/layout/app';

const RootStyle = styled(Page)((theme) => ({
  root: {},
}));

const App: FC = () => {
  return (
    <AppLayout>
      <Farming />
    </AppLayout>
  );
};

export default App;
