import React, { useState, FC } from 'react';

import { Icon } from '@iconify/react';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { NextLink } from '@ursa/components/links';
import { pxToRem } from '@ursa/util';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  lineHeight: 22 / 14,
  fontSize: pxToRem(14),
  height: 48,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&.isActiveRoot': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
    },
  },
  '&.isActiveSub': {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& .subIcon:before': {
      transform: 'scale(2)',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const SubIconStyle = styled('span')(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    width: 4,
    height: 4,
    content: "''",
    display: 'block',
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
    transition: theme.transitions.create('transform'),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  level: number;
  title: string;
  href?: string;
  info?: React.ReactNode;
  icon?: React.ReactNode;
  open?: boolean;
};

const NavItem: FC<Props> = ({
  level,
  title,
  href,
  info,
  icon,
  open = false,
  children,
}) => {
  const [show, setShow] = useState(open);
  const isSubItem = level > 0;

  const handleShow = () => {
    setShow((show) => !show);
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          disableGutters
          onClick={handleShow}
          className={open ? 'isActiveRoot' : ''}
        >
          <ListItemIcon>{icon && icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={show ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={show}>{children}</Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      // @ts-expect-error href isn't part of the styling
      href={href}
      disableGutters
      component={NextLink}
      activeClassName={isSubItem ? 'isActiveSub' : 'isActiveRoot'}
    >
      <ListItemIcon>
        {isSubItem ? <SubIconStyle className="subIcon" /> : icon}
      </ListItemIcon>
      <ListItemText disableTypography primary={title} />

      {info && info}
    </ListItemStyle>
  );
};

export default NavItem;
