import { useState, FC } from 'react';
import { styled } from '@mui/material/styles';

import { MHidden } from '@orca/components';

import NavBar from './NavBar';
import TopBar from './TopBar';
import { MobileAccountInfo } from './Mobile';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const DashboardLayout: FC = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <RootStyle>
      <TopBar onOpenNav={() => setOpenNav(true)} />
      <NavBar onCloseNav={() => setOpenNav(false)} isOpenNav={openNav} />
      <MainStyle>{children}</MainStyle>
      <MHidden width="smUp">
        <MobileAccountInfo />
      </MHidden>
    </RootStyle>
  );
};

export default DashboardLayout;
