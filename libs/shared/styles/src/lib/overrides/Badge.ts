import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';
const Badge = (theme: Theme) => {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: { width: 10, height: 10, borderRadius: '50%' },
      },
    },
  };
};

export default Badge;
