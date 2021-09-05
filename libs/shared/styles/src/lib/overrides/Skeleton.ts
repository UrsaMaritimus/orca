import { Theme } from '@mui/material/styles';

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
