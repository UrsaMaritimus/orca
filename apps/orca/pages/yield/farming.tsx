import React, { FC } from 'react';
import { Farming } from '@orca/pages/yield';
import { AppLayout } from '@orca/layouts';

const App: FC = () => {
  return (
    <AppLayout>
      <Farming />
    </AppLayout>
  );
};

export default App;
