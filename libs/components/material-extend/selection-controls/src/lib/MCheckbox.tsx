import { forwardRef } from 'react';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

// ----------------------------------------------------------------------

type Props = {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
} & Omit<CheckboxProps, 'color'>;

const MCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ color = 'primary', sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === 'default' || color === 'primary' || color === 'secondary') {
      return <Checkbox ref={ref} color={color} sx={sx} {...other} />;
    }

    return (
      <Checkbox
        ref={ref}
        sx={{
          '&.Mui-checked': {
            color: theme.palette[color].main,
          },
          '&.MuiCheckbox-indeterminate': {
            color: theme.palette[color].main,
          },
          '&:hover, &.Mui-checked:hover': {
            backgroundColor: alpha(
              theme.palette[color].main,
              theme.palette.action.hoverOpacity
            ),
          },
          ...sx,
        }}
        {...other}
      />
    );
  }
);

export default MCheckbox;
