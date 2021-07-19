import { Theme } from '@material-ui/core/styles'

const Container = (theme: Theme) => {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
    },
  }
}

export default Container
