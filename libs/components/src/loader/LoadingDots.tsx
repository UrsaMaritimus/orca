import { FC } from 'react';

import { m, LazyMotion } from 'framer-motion';

import { loadFeatures } from '../animate';

const loadingContainer = {
  width: '2rem',
  height: '1.75rem',
  display: 'flex',
  justifyContent: 'space-around',
};

const loadingCircle = {
  display: 'block',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: '#212B36',
  borderRadius: '0.25rem',
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const loadingCircleTransition = {
  duration: 0.6,
  yoyo: Infinity,
  ease: 'easeInOut',
};

export const LoadingDots: FC = () => {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <m.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <m.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <m.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </m.div>
    </LazyMotion>
  );
};
