import React, { FC } from 'react';
import { Staking } from '@orca/pages/stake';
import { AppLayout } from '@orca/layout/app';

const App: FC = () => {
  return (
    <AppLayout>
      <Staking />
    </AppLayout>
  );
};

export default App;
