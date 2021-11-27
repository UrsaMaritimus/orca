import { forwardRef } from 'react';

import { Avatar, AvatarProps } from '@mui/material';

import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  className?: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
} & Omit<AvatarProps, 'cplor'>;

const MAvatar = forwardRef<HTMLDivElement, Props>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === 'default') {
      return (
        <Avatar ref={ref} sx={sx} {...other}>
          {children}
        </Avatar>
      );
    }

    return (
      <Avatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </Avatar>
    );
  }
);

export default MAvatar;
