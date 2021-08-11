import React, { FC } from 'react';

import { AppLayout } from '@orca/layout/app';
import { ManageVault } from '@orca/pages/manage-vault';

const App: FC = () => {
  return (
    <AppLayout>
      <ManageVault />
    </AppLayout>
  );
};

export default App;