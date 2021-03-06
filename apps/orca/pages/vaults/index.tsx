import React, { FC } from 'react';

import { Vaults } from '@orca/pages';
import { AppLayout } from '@orca/layouts';

const App: FC = () => {
  return (
    <AppLayout>
      <Vaults />
    </AppLayout>
  );
};

export default App;
