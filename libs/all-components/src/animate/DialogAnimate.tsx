import React, { FC } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogProps } from '@mui/material';

import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

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
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          // Little cheat to get typescript to be happy
          PaperComponent={motion.div as React.ComponentType<unknown>}
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
  );
};

export default DialogAnimate;
