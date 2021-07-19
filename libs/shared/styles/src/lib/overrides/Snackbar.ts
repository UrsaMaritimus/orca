import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Snackbar = (theme: Theme) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {},
      },
    },
  };
};
export default Snackbar;
