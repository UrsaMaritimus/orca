import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const SvgIcon = (theme: Theme) => {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          width: 20,
          height: 20,
          fontSize: 'inherit',
        },
        fontSizeLarge: {
          width: 32,
          height: 32,
          fontSize: 'inherit',
        },
      },
    },
  };
};

export default SvgIcon;
