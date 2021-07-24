import { FC } from 'react';
// material
import { useMediaQuery } from '@material-ui/core';
import { Theme, Breakpoint } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

type MHiddenProps = {
  width:
    | 'xsDown'
    | 'smDown'
    | 'mdDown'
    | 'lgDown'
    | 'xlDown'
    | 'xsUp'
    | 'smUp'
    | 'mdUp'
    | 'lgUp'
    | 'xlUp';
};

export const MHidden: FC<MHiddenProps> = ({ width, children }) => {
  const breakpoint: Breakpoint = width.substring(0, 2) as unknown as Breakpoint;

  const hiddenUp = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes('Down')) {
    return hiddenDown ? <></> : <>{children}</>;
  }

  if (width.includes('Up')) {
    return hiddenUp ? <></> : <>{children}</>;
  }

  return <></>;
};

export default MHidden;
