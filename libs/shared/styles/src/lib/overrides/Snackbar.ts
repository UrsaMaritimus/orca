import { Theme } from '@mui/material/styles';

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
