import React, { FC } from 'react';

import { Icon } from '@iconify/react';

import menu2Fill from '@iconify/icons-eva/menu-2-fill';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Stack from '@material-ui/core/Stack';

import { useWeb3React } from '@web3-react/core';

import { useEagerConnect, useCollapseDrawer } from '@ursa/hooks';

import { MHidden } from '@ursa/components/material-extend/hidden';
import { Account } from '@ursa/components/account';
import { Balance } from '@ursa/components/balance';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

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
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  const { isCollapse } = useCollapseDrawer();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` },
        }),
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary',
            }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 3 }}
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {isConnected && <Balance />}
          <Account />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default TopBar;
