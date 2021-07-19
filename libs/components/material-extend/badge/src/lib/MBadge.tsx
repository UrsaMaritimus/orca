import { forwardRef } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Badge, { BadgeProps } from '@material-ui/core/Badge'

// ----------------------------------------------------------------------

type Props = {
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
} & Omit<BadgeProps, 'color'>

const MBadge = forwardRef<HTMLSpanElement, Props>(({ color = 'default', children, sx, ...other }, ref) => {
  const theme = useTheme()

  if (color === 'default' || color === 'error' || color === 'primary' || color === 'secondary') {
    return (
      <Badge ref={ref} color={color} sx={sx} {...other}>
        {children}
      </Badge>
    )
  }

  return (
    <Badge
      ref={ref}
      sx={{
        '& .MuiBadge-badge': {
          color: theme.palette[color].contrastText,
          bgcolor: theme.palette[color].main,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Badge>
  )
})

export default MBadge
