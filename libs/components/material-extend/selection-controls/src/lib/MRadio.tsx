import { FC } from 'react';

import { alpha, useTheme } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';

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
} & Omit<RadioProps, 'color'>;

const MRadio: FC<Props> = ({ color = 'primary', sx, ...other }) => {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Radio color={color} sx={sx} {...other} />;
  }

  return (
    <Radio
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main,
        },
        '&:hover, &.Mui-checked:hover': {
          bgcolor: alpha(
            theme.palette[color].main,
            theme.palette.action.hoverOpacity
          ),
        },
        ...sx,
      }}
      {...other}
    />
  );
};

export default MRadio;
