import React, { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';
import { AppLayout } from '@ursa/layout/app';
import { ManageVault } from '@ursa/pages/manage-vault';

const App: FC = () => {
  return (
    <AppLayout>
      <ManageVault />
    </AppLayout>
  );
};

export default App;
