import { Theme } from '@material-ui/core/styles'

const Popover = (theme: Theme) => {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadowExtension.z12,
        },
      },
    },
  }
}

export default Popover
