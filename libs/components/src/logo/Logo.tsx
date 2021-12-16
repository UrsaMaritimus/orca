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
        src="/static/brand/ic_logo_solo_santa.svg"
        height={40}
        width={40}
        {...other}
      />
    </Box>
  );
};

export default Logo;
