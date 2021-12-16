import { FC } from 'react';
import { Box } from '@mui/material';
type Props = {
  sx?: Record<string, unknown>;
};

const Logo: FC<Props> = ({ sx, ...other }) => {
  return (
    <Box sx={sx}>
      <img
        alt="logo"
        src="/static/brand/logo_solo_santa.png"
        height={40}
        width={40}
        {...other}
      />
    </Box>
  );
};

export default Logo;
