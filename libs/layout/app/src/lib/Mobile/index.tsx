import { FC } from 'react';
import { useWeb3React } from '@web3-react/core';

import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';

import { Account, AvaiBalance } from '@orca/all-components';
import { ImportantLinks } from '../TopBar/ImportantLinks';
import { Grid } from '@mui/material';
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
          <Grid item xs={5} display="flex" justifyContent="center">
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
