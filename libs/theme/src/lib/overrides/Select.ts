import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Theme } from '@mui/material/styles';

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
