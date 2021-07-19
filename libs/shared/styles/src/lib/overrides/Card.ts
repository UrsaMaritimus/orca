import { Theme } from '@material-ui/core/styles'

const Card = (theme: Theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadowExtension.z16,
          borderRadius: theme.shape.borderRadiusMd,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  }
}

export default Card
