import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';
const Container = (theme: Theme) => {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
    },
  };
};

export default Container;
