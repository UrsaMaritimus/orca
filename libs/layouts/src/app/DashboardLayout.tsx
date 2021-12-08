import { ReactNode, useState, FC } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';

import { MHidden, ThemeSettings } from '@orca/components';

import NavBar from './NavBar';
import TopBar from './TopBar';
import { MobileAccountInfo } from './Mobile';

// ----------------------------------------------------------------------

interface ExtendedSidebarLayoutProps {
  children?: ReactNode;
}

// ----------------------------------------------------------------------

const DashboardLayout: FC<ExtendedSidebarLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [openNav, setOpenNav] = useState(false);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',

        '.MuiPageTitle-wrapper': {
          background:
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.trueWhite[5]
              : theme.colors.alpha.white[50],
          marginBottom: `${theme.spacing(4)}`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 1px 0 ' +
                alpha(lighten(theme.colors.primary.main, 0.7), 0.15) +
                ', 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)'
              : '0px 2px 4px -3px ' +
                alpha(theme.colors.alpha.black[100], 0.1) +
                ', 0px 5px 12px -4px ' +
                alpha(theme.colors.alpha.black[100], 0.05),
        },
      }}
    >
      <TopBar onOpenNav={() => setOpenNav(true)} />
      <NavBar onCloseNav={() => setOpenNav(false)} isOpenNav={openNav} />
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          display: 'block',
          flex: 1,
          pt: `${theme.header.height}`,
          [theme.breakpoints.up('lg')]: {
            ml: `${theme.sidebar.width}`,
          },
        }}
      >
        <Box display="block">
          {children}
          <ThemeSettings />
        </Box>
      </Box>

      <MHidden width="smUp">
        <MobileAccountInfo />
      </MHidden>
    </Box>
  );
};

export default DashboardLayout;
