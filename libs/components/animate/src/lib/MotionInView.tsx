import { FC, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  variants: Record<string, unknown>;
  transition?: Record<string, unknown>;
  triggerOnce?: boolean;
  threshold?: number | number[];
} & BoxProps;

// Component to check if something is in view
const MotionInView: FC<Props> = ({
  children,
  variants,
  transition,
  threshold,
  ...other
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: threshold || 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start(Object.keys(variants)[1]);
    } else {
      controls.start(Object.keys(variants)[0]);
    }
  }, [controls, inView, variants]);

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={Object.keys(variants)[0]}
      animate={controls}
      variants={variants}
      transition={transition}
      {...other}
    >
      {children}
    </Box>
  );
};

export default MotionInView;
