import { Theme } from '@material-ui/core/styles'

// ----------------------------------------------------------------------

export default function Breadcrumbs(theme: Theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
      },
    },
  }
}
