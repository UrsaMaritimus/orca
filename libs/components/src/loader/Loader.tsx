import { FC } from 'react';
import { m, LazyMotion } from 'framer-motion';
import { Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { Logo } from '../logo';
import { loadFeatures } from '../animate';

type Props = {
  [key: string]: string | number | Record<string | number, unknown>;
};

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 2),
  margin: theme.spacing(10, 10),
}));

const Loader: FC<Props> = ({ ...other }) => {
  return (
    <LazyMotion features={loadFeatures}>
      <RootStyle {...other}>
        <m.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Logo sx={{ height: 64 }} />
        </m.div>

        <Box
          component={m.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) =>
              `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
          }}
        />

        <Box
          component={m.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity,
          }}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) =>
              `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
          }}
        />
      </RootStyle>
    </LazyMotion>
  );
};

export default Loader;
