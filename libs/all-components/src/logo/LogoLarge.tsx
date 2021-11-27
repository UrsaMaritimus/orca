import { FC } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

type Props = {
  sx?: Record<string, unknown>;
  height?: number;
  width?: number;
};

const Logo: FC<Props> = ({ sx, ...other }) => {
  return (
    <Box sx={{ mt: 1, ...sx }}>
      <Image
        alt="logo"
        src="/static/brand/logo_full.svg"
        height={175}
        width={175}
        {...other}
      />
    </Box>
  );
};

export default Logo;
