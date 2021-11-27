import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

import { Page } from '@orca/components';
import { Farming } from '@orca/pages/yield';
import { AppLayout } from '@orca/layout/app';

const App: FC = () => {
  return (
    <AppLayout>
      <Farming />
    </AppLayout>
  );
};

export default App;
