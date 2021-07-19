import { forwardRef } from 'react';
import Fab, { FabProps } from '@material-ui/core/Fab';
import { useTheme } from '@material-ui/core/styles';

import { ButtonAnimate } from '@ursa/components/animate';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  color?:
    | 'default'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
} & Omit<FabProps, 'color'>;

const MFab = forwardRef<HTMLButtonElement, Props>(
  ({ children, color = 'primary', sx, className, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <ButtonAnimate>
          <Fab ref={ref} color={color} sx={sx} {...other}>
            {children}
          </Fab>
        </ButtonAnimate>
      );
    }

    return (
      <ButtonAnimate>
        <Fab
          ref={ref}
          sx={{
            boxShadow: theme.shadowExtension[color],
            color: theme.palette[color].contrastText,
            bgcolor: theme.palette[color].main,
            '&:hover': {
              bgcolor: theme.palette[color].dark,
            },
            ...sx,
          }}
          {...other}
        >
          {children}
        </Fab>
      </ButtonAnimate>
    );
  }
);

export default MFab;
