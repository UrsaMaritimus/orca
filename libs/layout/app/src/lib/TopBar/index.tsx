import React, { FC } from 'react';

import { Icon } from '@iconify/react';

import menu2Fill from '@iconify/icons-eva/menu-2-fill';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Stack from '@material-ui/core/Stack';

import { useWeb3React } from '@web3-react/core';

import { useEagerConnect } from '@ursa/hooks';

import { Account } from '@ursa/components/account';
import { Balance } from '@ursa/components/balance';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: React.MouseEventHandler<HTMLButtonElement>;
};

const TopBar: FC<Props> = ({ onOpenNav }) => {
  const triedToEagerConnect = useEagerConnect();

  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  return (
    <RootStyle>
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary',
            }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *:not(:first-of-type)': {
              ml: { xs: 1.5, sm: 2, lg: 3 },
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          ></Stack>
          {isConnected && <Balance />}
          <Account />
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default TopBar;
