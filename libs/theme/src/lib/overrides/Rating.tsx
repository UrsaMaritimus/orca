import { Icon } from '@iconify/react';
import starFill from '@iconify/icons-eva/star-fill';
import SvgIcon from '@mui/material/SvgIcon';

import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ICON_SMALL = { width: 20, height: 20 };
const ICON_LARGE = { width: 28, height: 28 };

const ICON = (
  <SvgIcon>
    <Icon icon={starFill} />
  </SvgIcon>
);
const Rating = (theme: Theme) => {
  return {
    MuiRating: {
      defaultProps: {
        emptyIcon: ICON,
        icon: ICON,
      },

      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.48,
          },
        },
        iconEmpty: { color: theme.palette.grey[500_48] },
        sizeSmall: { '& svg': { ...ICON_SMALL } },
        sizeLarge: { '& svg': { ...ICON_LARGE } },
      },
    },
  };
};

export default Rating;
