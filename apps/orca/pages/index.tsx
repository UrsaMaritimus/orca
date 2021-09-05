import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { styled } from '@mui/material/styles';

import { Page } from '@orca/components/page';
import { AppPage } from '@orca/pages/app';
import { AppLayout } from '@orca/layout/app';
import { routes } from '@orca/shared/base';

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
        <AppPage />
      </AppLayout>
    </RootStyle>
  );
};

/**
 * Remove this after main page is created
 *
 * @param context
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.res) {
    context.res.writeHead(302, { Location: routes.APP.VAULTS.USER });
    context.res.end();

    return {
      props: {},
    };
  }
};

export default App;
