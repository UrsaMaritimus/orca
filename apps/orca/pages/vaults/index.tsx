import React, { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Page } from '@orca/components/page';
import { Vaults } from '@orca/pages/vaults';
import { AppLayout } from '@orca/layout/app';

const RootStyle = styled(Page)((theme) => ({
  root: {},
}));

const App: FC = () => {
  return (
    <RootStyle
      title={`Dashboard | ${process.env.NEXT_PUBLIC_TITLE}`}
      id={'AppPage'}
    >
      <AppLayout>
        <Vaults />
      </AppLayout>
    </RootStyle>
  );
};

export default App;
