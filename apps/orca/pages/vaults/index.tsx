import React, { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Page } from '@orca/components/page';
import { Vaults } from '@orca/pages/vaults';
import { AppLayout } from '@orca/layout/app';

const RootStyle = styled(Page)((theme) => ({
  root: {},
}));

const App: FC = () => {
  return (
    <AppLayout>
      <Vaults />
    </AppLayout>
  );
};

export default App;
