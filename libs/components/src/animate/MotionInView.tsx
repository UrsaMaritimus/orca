import { FC, useEffect } from 'react';
import { m, useAnimation, LazyMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, BoxProps } from '@mui/material';

import { loadFeatures } from '../animate';

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
    <LazyMotion features={loadFeatures}>
      <Box
        ref={ref}
        component={m.div}
        initial={Object.keys(variants)[0]}
        animate={controls}
        variants={variants}
        transition={transition}
        {...other}
      >
        {children}
      </Box>
    </LazyMotion>
  );
};

export default MotionInView;
