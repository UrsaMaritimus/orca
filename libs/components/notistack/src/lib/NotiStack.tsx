import { FC } from 'react';

import { Icon } from '@iconify/react';
import { SnackbarProvider } from 'notistack';
import infoFill from '@iconify/icons-eva/info-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';

import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
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

const NotistackProvider: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      dense
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      iconVariant={{
        success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
        error: <SnackbarIcon icon={infoFill} color="error" />,
        warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
        info: <SnackbarIcon icon={alertCircleFill} color="info" />,
      }}
      className={classes.root}
      classes={{
        // @ts-expect-error Necessary as notistack doesn't let editing of the component beyond building entire new SnackbarContent
        containerRoot: classes.containerRoot,
        // @ts-expect-error Necessary as notistack doesn't let editing of the component beyond building entire new SnackbarContent
        contentRoot: classes.contentRoot,
        message: classes.message,
        action: classes.action,
        variantInfo: classes.info,
        variantSuccess: classes.success,
        variantWarning: classes.warning,
        variantError: classes.error,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
