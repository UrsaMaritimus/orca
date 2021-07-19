import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Select = (theme: Theme) => {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon,
      },

      styleOverrides: {
        root: {},
      },
    },
  };
};

export default Select;