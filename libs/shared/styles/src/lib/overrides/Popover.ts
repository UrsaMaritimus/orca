import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Popover = (theme: Theme) => {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadowExtension.z12,
        },
      },
    },
  };
};

export default Popover;
