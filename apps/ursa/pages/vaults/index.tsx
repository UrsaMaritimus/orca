import React, { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Page } from '@ursa/components/page';
import { Vaults } from '@ursa/pages/vaults';
import { AppLayout } from '@ursa/layout/app';

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
