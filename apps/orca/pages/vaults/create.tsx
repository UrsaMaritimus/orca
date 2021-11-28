import React, { FC } from 'react';

import { CreateVault } from '@orca/pages/create-vault';
import { AppLayout } from '@orca/layouts';

const App: FC = () => {
  return (
    <AppLayout>
      <CreateVault />
    </AppLayout>
  );
};

export default App;
