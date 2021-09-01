import { useState, FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Stack from '@material-ui/core/Stack';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { Account } from '@orca/components/account';
import { AvaiBalance } from '@orca/components/balance';
import { ImportantLinks } from '../TopBar/ImportantLinks';
import { Grid } from '@material-ui/core';
// ----------------------------------------------------------------------

const BannerStyle = styled('div')(({ theme }) => ({
  top: '89%',
  position: 'fixed',
  width: '100%',
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

export const MobileAccountInfo: FC = () => {
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  return (
    <BannerStyle>
      <Grid container alignItems="center">
        {isConnected && (
          <Grid item xs={5}>
            <AvaiBalance />
          </Grid>
        )}

        <Grid item xs={isConnected ? 7 : 12}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Account />
            <ImportantLinks />
          </Stack>
        </Grid>
      </Grid>
    </BannerStyle>
  );
};

export default MobileAccountInfo;
