import { FC } from 'react'

import { motion } from 'framer-motion'

import Box, { BoxProps } from '@material-ui/core/Box'

import { varSmallClick, varMediumClick } from './variants'

// ----------------------------------------------------------------------

type Props = {
  mediumClick?: boolean
} & BoxProps

const ButtonAnimate: FC<Props> = ({ children, sx, mediumClick = false, ...other }) => {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: 'inline-flex', ...sx }}
      {...other}
    >
      {children}
    </Box>
  )
}

export default ButtonAnimate
