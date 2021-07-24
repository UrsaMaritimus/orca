import { useState, FC } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';

import ListItemButton, {
  ListItemButtonProps,
} from '@material-ui/core/ListItemButton';
import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { NextLink } from '@ursa/components/links';

import MenuLinks from './config';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props: ListSubheaderProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

type ListItemStyleProps = {
  component?: React.FC;
  href?: string;
} & ListItemButtonProps;

const ListItemStyle = styled((props: ListItemStyleProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

type Item = {
  title: string;
  icon?: JSX.Element;
  href: string;
  info?: JSX.Element;
  children?: Item[] | undefined;
};

type NavItemProps = {
  active: boolean;
  isShow: boolean;
  item: Item;
};

const NavItem: FC<NavItemProps> = ({ item, active, isShow }) => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const isActiveRoot = active;
  const { title, href, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item: Item) => {
                const { title, href } = item;
                const isActiveSub = pathname === href;

                return (
                  <ListItemStyle
                    key={title}
                    component={NextLink}
                    href={href}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'text.disabled',
                          transition: (theme) =>
                            theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: 'primary.main',
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={NextLink}
      href={href}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
};

type NavSectionProps = {
  isShow: boolean;
  navConfig: typeof MenuLinks;
};

const NavSection: FC<NavSectionProps> = ({
  navConfig,
  isShow = true,
  ...other
}) => {
  const { pathname } = useRouter();

  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            {isShow && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
            {items.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                active={pathname === item.href}
                isShow={isShow}
              />
            ))}
          </List>
        );
      })}
    </Box>
  );
};

export default NavSection;
