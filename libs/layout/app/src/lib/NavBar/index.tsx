import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '@material-ui/core/Link';
import { routes } from '@ursa/shared/base';
import { Logo } from '@ursa/components/logo';
import { ScrollBar } from '@ursa/components/scroll-bar';
import { NextLink } from '@ursa/components/links';
import { useWeb3React } from '@web3-react/core';

import { Balance } from '@ursa/components/balance';
import { formatEtherscanLink, shortenHex, injected } from '@ursa/util';

import NavItem from './NavItem';
import MenuLinks from './config';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(1, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

const DocStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.primary.main, 0.08)
      : theme.palette.primary.lighter,
}));

// ----------------------------------------------------------------------
type Item = {
  title: string;
  icon?: JSX.Element;
  href: string;
  info?: JSX.Element;
  items?: Item[] | undefined;
};

type ReduceChildProps = {
  item: Item;
  array: any;
  pathname: string;
  level: number;
};

type RenderNavProps = {
  pathname: string;
  items: Item[];
  level?: number;
};

type Props = {
  onCloseNav: (
    event?: Record<string, unknown>,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => void;
  isOpenNav: boolean;
};

// ----------------------------------------------------------------------

/**Internals of child nav item */
function reduceChild({ array, item, pathname, level }: ReduceChildProps) {
  const key = item.href + level;

  if (item.items) {
    const match = pathname === item.href;

    array = [
      ...array,
      <NavItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderNavItems({
          pathname,
          level: level + 1,
          items: item.items,
        })}
      </NavItem>,
    ];
  } else {
    array = [
      ...array,
      <NavItem
        key={key}
        level={level}
        href={item.href}
        icon={item.icon}
        info={item.info}
        title={item.title}
      />,
    ];
  }
  return array;
}

/**Render each item */
const renderNavItems = ({ items, pathname, level = 0 }: RenderNavProps) => {
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }),
        []
      )}
    </List>
  );
};

const NavBar: FC<Props> = ({ isOpenNav, onCloseNav }) => {
  const { pathname } = useRouter();
  const { chainId, account, library } = useWeb3React();

  useEffect(() => {
    if (isOpenNav && onCloseNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isConnected = typeof account === 'string' && !!library;

  const renderContent = (
    <ScrollBar>
      <Box sx={{ px: 2.5, py: 3 }}>
        <NextLink href={routes.APP.ROOT}>
          <Logo />
        </NextLink>
      </Box>

      {MenuLinks.map((list) => (
        <List
          disablePadding
          key={list.subheader}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              sx={{
                mt: 3,
                mb: 2,
                pl: 5,
                color: 'text.primary',
                typography: 'overline',
              }}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderNavItems({
            items: list.items,
            pathname: pathname,
          })}
        </List>
      ))}

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <DocStyle>
          <Box
            component="img"
            alt="doc"
            src="/static/icons/ic_doc.svg"
            sx={{ width: 36, height: 36, mb: 2 }}
          />

          <Typography variant="body2" sx={{ mb: 2, color: 'grey.600' }}>
            Need help?
            <br /> Please check our docs
          </Typography>

          <Button
            fullWidth
            href={routes.DOCS}
            variant="contained"
            component={Link}
            target="_blank"
          >
            Documentation
          </Button>
        </DocStyle>
      </Box>
    </ScrollBar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
};

export default NavBar;
