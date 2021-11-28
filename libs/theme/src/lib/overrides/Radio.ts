import { Theme } from '@mui/material/styles';

const Radio = (theme: Theme) => {
  return {
    MuiRadio: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
  };
};

export default Radio;
