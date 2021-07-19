import { Theme } from '@material-ui/core/styles'

const Fab = (theme: Theme) => {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },

      variants: [
        {
          props: { color: 'primary' },
          style: {
            boxShadow: theme.shadowExtension.primary,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          boxShadow: theme.shadowExtension.z8,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey[400],
          },
        },
        primary: {},
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  }
}

export default Fab
