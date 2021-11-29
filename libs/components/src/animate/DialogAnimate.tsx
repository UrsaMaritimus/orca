import React, { FC } from 'react';

import { m, AnimatePresence, LazyMotion } from 'framer-motion';
import { Dialog, DialogProps } from '@mui/material';

import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------
export const loadFeatures = () =>
  import('./animationLoad').then((res) => res.default);

type Props = {
  animate?: { [key: string]: any };
} & DialogProps;

const DialogAnimate: FC<Props> = ({
  open = false,
  animate,
  onClose,
  children,
  className,
  ...other
}) => {
  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {open && (
          <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}
            // Little cheat to get typescript to be happy
            PaperComponent={m.div as React.ComponentType<unknown>}
            PaperProps={{
              sx: {
                borderRadius: 2,
                bgcolor: 'background.paper',
              },
              ...(animate || varFadeInUp),
            }}
            {...other}
          >
            {children}
          </Dialog>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default DialogAnimate;
