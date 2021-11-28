import React, { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { alpha, styled } from '@mui/material/styles';

import {
  Stack,
  CardActionArea,
  Tooltip,
  Link,
  Drawer,
  Typography,
  Button,
  Box,
} from '@mui/material';

import { NextLink, MHidden, Logo, ScrollBar } from '@orca/components';
import { routes } from '@orca/shared';
import { useCollapseDrawer } from '@orca/hooks';

import NavSection from './NavSection';
import MenuLinks from './config';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex,
    }),
  },
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

type Props = {
  onCloseNav: (
    event?: Record<string, unknown>,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => void;
  isOpenNav: boolean;
};

// ----------------------------------------------------------------------

type IconCollapseProps = {
  onToggleCollapse: React.MouseEventHandler<HTMLButtonElement>;
  collapseClick: boolean;
};
const IconCollapse: FC<IconCollapseProps> = ({
  onToggleCollapse,
  collapseClick,
}) => {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0,
            }),
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
};

const NavBar: FC<Props> = ({ isOpenNav, onCloseNav }) => {
  const { pathname } = useRouter();

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenNav && onCloseNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <ScrollBar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center',
          }),
        }}
      >
        <Box sx={{ display: 'inline-flex' }}>
          <NextLink href={routes.APP.ROOT}>
            <Logo />
          </NextLink>
        </Box>
        <MHidden width="lgDown">
          {!isCollapse && (
            <IconCollapse
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </MHidden>
      </Stack>

      <NavSection navConfig={MenuLinks} isShow={!isCollapse} />

      <Box sx={{ flexGrow: 1 }} />
      <NextLink
        href="https://paladinsec.co/projects/orcadao/"
        target="_blank"
        rel="noreferrer"
        sx={{ mx: 'auto', mt: 10 }}
      >
        <Image
          src="https://paladinsec.co/pld/assets/audited-by-paladin-standard.svg"
          width={250}
          height={100}
        />
      </NextLink>
      {!isCollapse && (
        <Box sx={{ px: 2.5, pb: 3 }}>
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
      )}
    </ScrollBar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.shadowExtension.z20,
                bgcolor: (theme) =>
                  alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

export default NavBar;
