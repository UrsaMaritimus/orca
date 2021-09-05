import { Theme } from '@mui/material/styles';

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
