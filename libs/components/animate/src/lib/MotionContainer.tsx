import { FC } from 'react';

import { motion } from 'framer-motion';
import { Box, BoxProps } from '@material-ui/core';

import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  initial: boolean | string;
} & Omit<BoxProps, 'initial'>;

const MotionContainer: FC<Props> = ({ open, children, ...other }) => {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
};

export default MotionContainer;
