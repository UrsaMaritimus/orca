import { FC } from 'react';

import { m, LazyMotion } from 'framer-motion';

import { Box, BoxProps } from '@mui/material';

import { varSmallClick, varMediumClick } from './variants';

// ----------------------------------------------------------------------

type Props = {
  mediumClick?: boolean;
} & BoxProps;

export const loadFeatures = () =>
  import('./animationLoad').then((res) => res.default);

const ButtonAnimate: FC<Props> = ({
  children,
  sx,
  mediumClick = false,
  ...other
}) => {
  return (
    <LazyMotion features={loadFeatures}>
      <Box
        component={m.div}
        whileTap="tap"
        whileHover="hover"
        variants={mediumClick ? varMediumClick : varSmallClick}
        sx={{ display: 'inline-flex', ...sx }}
        {...other}
      >
        {children}
      </Box>
    </LazyMotion>
  );
};

export default ButtonAnimate;
