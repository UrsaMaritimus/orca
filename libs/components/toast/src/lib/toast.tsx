import { Toaster } from 'react-hot-toast';
import { FC } from 'react';

import { Icon } from '@iconify/react';
import infoFill from '@iconify/icons-eva/info-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';

import { alpha } from '@mui/material/styles';

import { Box } from '@mui/material';
import { makeStyles } from '@orca/shared/styles';

export enum NOTIFICATIONS_TYPES {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

const useStyles = makeStyles()((theme) => {
  console.log(theme);
  // Checks the palette light mode
  const isLight = theme.palette.mode === 'light';

  // Function to produce same style depending on color (i.e. error, info, success, etc.)
  const createStyle = (color: string) => {
    return {
      color: `${theme.palette.grey[isLight ? 800 : 0]} !important`,
      backgroundColor: `${theme.palette.grey[isLight ? 0 : 800]} !important`,
      '& $icon': {
        color: theme.palette.color[color].main,
        backgroundColor: alpha(theme.palette.color[color].main, 0.16),
      },
    };
  };

  return {
    // Content root
    root: {
      padding: theme.spacing(1.5),
      boxShadow: theme.shadowExtension.z8,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey[isLight ? 0 : 800],
      backgroundColor: `${theme.palette.grey[isLight ? 900 : 0]} !important`,
    },
    // Icon data
    icon: {
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing(1.5),
      borderRadius: theme.shape.borderRadiusSm,
      '& svg': { width: 24, height: 24 },
    },
    // Messaging formatting
    message: {
      padding: 0,
      fontWeight: theme.typography.fontWeightMedium,
    },
    // What happens during the action
    action: {
      marginRight: -4,
      '& svg': {
        width: 20,
        height: 20,
        opacity: 0.48,
        '&:hover': { opacity: 1 },
      },
    },
    info: createStyle('info'),
    success: createStyle('success'),
    warning: createStyle('warning'),
    error: createStyle('error'),
  };
});
// ----------------------------------------------------------------------

type SnackBarIconProps = {
  icon: any;
  color: string;
};

const SnackbarIcon: FC<SnackBarIconProps> = ({ icon, color }) => {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Box>
  );
};

export const displayIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />;
    case 'info':
      return <SnackbarIcon icon={alertCircleFill} color="info" />;
    case 'error':
      return <SnackbarIcon icon={infoFill} color="error" />;
    case 'warning':
      return <SnackbarIcon icon={alertTriangleFill} color="warning" />;
    default:
      return <SnackbarIcon icon={alertCircleFill} color="info" />;
  }
};

type ViewProps = {
  message: string;
  type: string;
};
export const ToastView: FC<ViewProps> = ({ message, type }) => {
  const { classes } = useStyles();
  return <div className={classes.root}>{message}</div>;
};

export const CustomToaster: FC = () => {
  const { classes } = useStyles();
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: classes.root,
        duration: 5000,
        success: {
          className: classes.success,
          icon: displayIcon('success'),
        },
        error: {
          className: classes.error,
          icon: displayIcon('error'),
        },
      }}
    />
  );
};
