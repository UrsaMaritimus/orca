import { useState, useRef, FC } from 'react';
import { useRouter } from 'next/router';

import { Icon } from '@iconify/react';
import twitterOutline from '@iconify/icons-eva/twitter-outline';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import githubOutline from '@iconify/icons-eva/github-outline';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';

import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';

import { routes, useOffSetTop } from '@ursa/shared/base';
import { MIconButton } from '@ursa/components/material-extend/buttons';
import { Logo } from '@ursa/components/logo';
import { PopoverMenu } from '@ursa/components/popover-menu';
import { NextLink } from '@ursa/components/links';

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
    <RootStyle color="transparent">
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
            <Logo />
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
