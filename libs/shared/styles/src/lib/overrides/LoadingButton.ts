import { Theme } from '@material-ui/core/styles'
// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0,
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0,
            },
          },
        },
      },
    },
  }
}
