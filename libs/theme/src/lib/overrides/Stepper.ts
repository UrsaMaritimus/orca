import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Stepper(theme: Theme) {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
    MuiStepContent: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
