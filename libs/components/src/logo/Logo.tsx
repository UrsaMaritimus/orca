import { FC } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

type Props = {
  sx?: Record<string, unknown>;
};

const Logo: FC<Props> = ({ sx, ...other }) => {
  return (
    <Box sx={sx}>
      <Image
        alt="logo"
        src="/static/brand/logo_solo_santa.png"
        height={40}
        width={40}
        quality={100}
        {...other}
      />
    </Box>
  );
};

export default Logo;
