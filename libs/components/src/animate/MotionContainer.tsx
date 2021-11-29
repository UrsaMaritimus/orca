import { FC } from 'react';

import { m, LazyMotion } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';

import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------
export const loadFeatures = () =>
  import('./animationLoad').then((res) => res.default);

type Props = {
  open: boolean;
  initial?: boolean | string;
} & Omit<BoxProps, 'initial'>;

const MotionContainer: FC<Props> = ({ open, children, ...other }) => {
  return (
    <LazyMotion features={loadFeatures}>
      <Box
        component={m.div}
        initial={false}
        animate={open ? 'animate' : 'exit'}
        variants={varWrapEnter}
        {...other}
      >
        {children}
      </Box>
    </LazyMotion>
  );
};

export default MotionContainer;
