import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Slider = (theme: Theme) => {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.action.disabled,
          },
        },
        markLabel: {
          fontSize: 13,
          color: theme.palette.text.disabled,
        },
      },
    },
  };
};

export default Slider;
