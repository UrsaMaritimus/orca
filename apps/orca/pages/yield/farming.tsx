import React, { FC } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Page } from '@orca/components/page';
import { Farming } from '@orca/pages/yield';
import { AppLayout } from '@orca/layout/app';

const RootStyle = styled(Page)((theme) => ({
  root: {},
}));

const App: FC = () => {
  return (
    <RootStyle
      title={`USDC Exchange | ${process.env.NEXT_PUBLIC_TITLE}`}
      id={'USDC'}
    >
      <AppLayout>
        <Farming />
      </AppLayout>
    </RootStyle>
  );
};

export default App;
