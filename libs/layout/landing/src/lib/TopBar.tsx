import { useState, useRef, FC } from 'react';
import { useRouter } from 'next/router';

import { Icon } from '@iconify/react';
import twitterOutline from '@iconify/icons-eva/twitter-outline';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import githubOutline from '@iconify/icons-eva/github-outline';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';

import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';

import {
  Box,
  List,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  MenuItem,
  Container,
  ListItemText,
  ListItemIcon,
  Link,
} from '@material-ui/core';

import { routes, useOffSetTop } from '@orca/shared/base';
import { MIconButton } from '@orca/components/material-extend/buttons';
import { LargeLogo } from '@orca/components/logo';
import { PopoverMenu } from '@orca/components/popover-menu';
import { NextLink } from '@orca/components/links';

// ----------------------------------------------------------------------
//Constants
const LINKS = [
  { title: 'GitHub', icon: githubOutline, href: routes.LANDING.GITHUB },
  { title: 'Twitter', icon: twitterOutline, href: routes.LANDING.TWITTER },
  { title: 'Docs', icon: bookOpenOutline, href: routes.LANDING.DOCS },
];

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;
// ----------------------------------------------------------------------
// Styling

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  '& .isDesktopActive': {
    color: `${theme.palette.primary.main} !important`,
  },
  '& .isMobileActive': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: { height: APP_BAR_DESKTOP },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.shadowExtension.z8,
}));

// ----------------------------------------------------------------------

const TopBar: FC = () => {
  const anchorRef = useRef(null);
  const router = useRouter();
  const offset = useOffSetTop(100);
  const [openMenu, setOpenMenu] = useState(false);
  const isHome = router.pathname === '/';

  const renderMenuDesktop = (
    LINKS: {
      title: string;
      icon: any;
      href: string;
    }[]
  ) => (
    <>
      {LINKS.map((link) => (
        <NextLink
          href={link.href}
          key={link.title}
          underline="none"
          variant="subtitle2"
          target="_blank"
          activeClassName="isDesktopActive"
          sx={{
            mr: 5,
            color: 'text.primary',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
              }),
            '&:hover': { opacity: 0.48 },
            ...(isHome && { color: 'common.white' }),
            ...(offset && { color: 'text.primary' }),
          }}
        >
          {link.title}
        </NextLink>
      ))}
    </>
  );

  const renderMenuMobile = (
    LINKS: {
      title: string;
      icon: any;
      href: string;
    }[]
  ) => (
    <PopoverMenu
      disablePortal
      open={openMenu}
      anchorEl={anchorRef.current}
      onClose={() => setOpenMenu(false)}
    >
      <List>
        {LINKS.map((link) => (
          <MenuItem
            href={link.href}
            key={link.title}
            component={NextLink}
            onClick={() => setOpenMenu(false)}
            activeClassName="isMobileActive"
            sx={{ color: 'text.secondary', py: 1 }}
          >
            <ListItemIcon>
              <Icon icon={link.icon} width={20} height={20} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ typography: 'body2' }}>
              {link.title}
            </ListItemText>
          </MenuItem>
        ))}
      </List>
    </PopoverMenu>
  );

  return (
    <RootStyle sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(offset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 20 },
          }),
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <NextLink href="/">
            <LargeLogo />
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />

          <Hidden mdDown>{renderMenuDesktop(LINKS)}</Hidden>

          <Button
            variant="contained"
            component={Link}
            href={routes.LANDING.SITE}
          >
            Go to app
          </Button>

          <Hidden mdUp>
            <MIconButton
              ref={anchorRef}
              onClick={() => setOpenMenu(true)}
              sx={{
                ml: 1,
                ...(isHome && { color: 'common.white' }),
                ...(offset && { color: 'text.primary' }),
              }}
            >
              <Icon icon={menu2Fill} />
            </MIconButton>
            {renderMenuMobile(LINKS)}
          </Hidden>
        </Container>
      </ToolbarStyle>
      {offset && <ToolbarShadowStyle />}
    </RootStyle>
  );
};

export default TopBar;
