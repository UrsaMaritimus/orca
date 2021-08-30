import { useRef, useState, FC } from 'react';
import { Icon } from '@iconify/react';

import twitterOutline from '@iconify/icons-eva/twitter-outline';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import githubOutline from '@iconify/icons-eva/github-outline';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';
import bxlDiscordAlt from '@iconify/icons-bx/bxl-discord-alt';
import bxlMedium from '@iconify/icons-bx/bxl-medium';
// material
import { alpha } from '@material-ui/core/styles';
import { Stack, Box, Divider, MenuItem, Typography } from '@material-ui/core';

import { routes } from '@orca/shared/base';
import { MIconButton } from '@orca/components/material-extend/buttons';
import { PopoverMenu } from '@orca/components/popover-menu';
import { NextLink } from '@orca/components/links';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Medium',
    icon: bxlMedium,
    linkTo: routes.LANDING.MEDIUM,
  },
  {
    label: 'Discord',
    icon: bxlDiscordAlt,
    linkTo: routes.LANDING.DISCORD,
  },
  {
    label: 'Twitter',
    icon: twitterOutline,
    linkTo: routes.LANDING.TWITTER,
  },
  {
    label: 'Github',
    icon: githubOutline,
    linkTo: routes.LANDING.GITHUB,
  },
  {
    label: 'Documentation',
    icon: bookOpenOutline,
    linkTo: routes.DOCS,
  },
];

export const ImportantLinks: FC = () => {
  const anchorRef = useRef(null);
  // For opening menu
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <PopoverMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Important Links
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Take part!
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            href={option.linkTo}
            component={NextLink}
            onClick={handleClose}
            target="_blank"
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Icon icon={option.icon} width={25} height={25} />

              <Typography>{option.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </PopoverMenu>
    </>
  );
};
