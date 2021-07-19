import { Theme } from '@material-ui/core/styles';
import '@material-ui/lab/themeAugmentation';

const Timeline = (theme: Theme) => {
  return {
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.divider,
        },
      },
    },
  };
};

export default Timeline;
