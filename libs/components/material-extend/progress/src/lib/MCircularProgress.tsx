import { FC } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

type Props = {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
} & Omit<CircularProgressProps, 'color'>;

// ----------------------------------------------------------------------

const MCircularProgress: FC<Props> = ({ color = 'primary', sx, ...other }) => {
  const theme = useTheme();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <CircularProgress color={color} sx={sx} {...other} />;
  }

  return (
    <CircularProgress
      sx={{
        color: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    />
  );
};

export default MCircularProgress;
