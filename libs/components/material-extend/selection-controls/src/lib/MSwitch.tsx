import { FC } from 'react';

import { alpha, useTheme } from '@material-ui/core/styles';
import Switch, { SwitchProps } from '@material-ui/core/Switch';

// --

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
} & Omit<SwitchProps, 'color'>;

const MSwitch: FC<Props> = ({ color = 'primary', sx, ...other }) => {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Switch color={color} sx={sx} {...other} />;
  }

  return (
    <Switch
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main,
          '&:hover': {
            bgcolor: alpha(
              theme.palette[color].main,
              theme.palette.action.hoverOpacity
            ),
          },
        },
        '&.Mui-checked + .MuiSwitch-track': {
          bgcolor: theme.palette[color].main,
        },
        ...sx,
      }}
      {...other}
    />
  );
};

export default MSwitch;
