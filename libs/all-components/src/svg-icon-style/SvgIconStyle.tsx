import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

// ----------------------------------------------------------------------

type Props = {
  src: string;
} & BoxProps;

const SvgIconStyle: FC<Props> = ({ src, color = 'inherit', sx }) => {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        bgcolor: `${color}.main`,
        ...(color === 'inherit' && { bgcolor: 'currentColor' }),
        ...(color === 'action' && { bgcolor: 'action.active' }),
        ...(color === 'disabled' && { bgcolor: 'action.disabled' }),
        ...(color === 'paper' && { bgcolor: 'background.paper' }),
        ...sx,
      }}
    />
  );
};

export default SvgIconStyle;
