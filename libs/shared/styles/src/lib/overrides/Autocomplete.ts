import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';
const Autocomplete = (theme: Theme) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: { boxShadow: theme.shadowExtension.z20 },
      },
    },
  };
};

export default Autocomplete;
