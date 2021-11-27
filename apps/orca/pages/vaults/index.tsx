import React, { FC } from 'react';

import { Page } from '@orca/components';
import { Vaults } from '@orca/pages/vaults';
import { AppLayout } from '@orca/layout/app';

const App: FC = () => {
  return (
    <AppLayout>
      <Vaults />
    </AppLayout>
  );
};

export default App;
