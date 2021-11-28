import { Theme } from '@mui/material/styles';

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
