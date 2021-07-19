import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Progress = (theme: Theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 4,
        },
        colorPrimary: {
          backgroundColor:
            theme.palette.primary[isLight ? 'lighter' : 'darker'],
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
};

export default Progress;