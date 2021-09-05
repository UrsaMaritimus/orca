import { forwardRef } from 'react';

import { ButtonAnimate } from '@orca/components/animate';

import { alpha, useTheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

// ----------------------------------------------------------------------

// Typings similar to HTML Button Element
type Props = {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'white'
    | 'default';
} & Omit<IconButtonProps, 'color'>;

const MIconButton = forwardRef<HTMLButtonElement, Props>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <ButtonAnimate>
          <IconButton ref={ref} color={color} sx={sx} {...other}>
            {children}
          </IconButton>
        </ButtonAnimate>
      );
    }

    return (
      <ButtonAnimate>
        <IconButton
          ref={ref}
          sx={{
            color: theme.palette[color].main,
            '&:hover': {
              bgcolor: alpha(
                theme.palette[color].main,
                theme.palette.action.hoverOpacity
              ),
            },
            ...sx,
          }}
          {...other}
        >
          {children}
        </IconButton>
      </ButtonAnimate>
    );
  }
);

export default MIconButton;
