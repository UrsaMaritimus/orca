import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Skeleton = (theme: Theme) => {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
};

export default Skeleton;
