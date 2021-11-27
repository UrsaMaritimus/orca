import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

import { Page } from '@orca/components';
import { USDCSwap } from '@orca/pages/exchange';
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
        <USDCSwap />
      </AppLayout>
    </RootStyle>
  );
};

export default App;
