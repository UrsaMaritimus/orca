import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Tooltip = (theme: Theme) => {
  const isLight = theme.palette.mode === 'light';
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 700],
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 700],
        },
      },
    },
  };
};

export default Tooltip;
