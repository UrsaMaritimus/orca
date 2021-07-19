import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';
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
