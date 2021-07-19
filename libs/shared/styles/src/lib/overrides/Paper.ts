import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Paper = (theme: Theme) => {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
};

export default Paper;
