import { useState, FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import options2Fill from '@iconify/icons-eva/options-2-fill';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';

import { MIconButton } from '@orca/components/material-extend/buttons';
import { ScrollBar } from '@orca/components/scroll-bar';
import { Account } from '@orca/components/account';
import { Balance, AvaiBalance } from '@orca/components/balance';
import { ImportantLinks } from '../TopBar/ImportantLinks';
import { Grid } from '@material-ui/core';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

// ----------------------------------------------------------------------

export const MobileAccountInfo: FC = () => {
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      />
      <Box
        sx={{
          top: '90%',
          position: 'fixed',
          right: '10%',
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <Grid container alignItems="center">
          {isConnected && (
            <Grid item xs={5}>
              <AvaiBalance
                size="small"
                iconSize={20}
                variant="subtitle2"
                fontSize={10}
              />
            </Grid>
          )}

          <Grid item xs={isConnected ? 6 : 10}>
            <Account
              size="small"
              iconSize={20}
              variant="subtitle2"
              fontSize={10}
            />
          </Grid>
          <Grid item xs={1}>
            <ImportantLinks />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MobileAccountInfo;
