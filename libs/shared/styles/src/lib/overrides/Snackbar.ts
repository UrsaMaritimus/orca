import { Theme } from '@material-ui/core/styles'

const Snackbar = (theme: Theme) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {},
      },
    },
  }
}
export default Snackbar
