import { Theme } from '@mui/material/styles';

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
