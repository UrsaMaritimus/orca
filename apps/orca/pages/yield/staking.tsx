import React, { FC } from 'react';
import { Staking } from '@orca/pages/stake';
import { AppLayout } from '@orca/layouts';

const App: FC = () => {
  return (
    <AppLayout>
      <Staking />
    </AppLayout>
  );
};

export default App;
