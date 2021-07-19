import { forwardRef } from 'react'
import Chip, { ChipProps } from '@material-ui/core/Chip'
import { alpha, experimentalStyled as styled, emphasize } from '@material-ui/core/styles'

// ----------------------------------------------------------------------
type Props = {
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  variant?: 'filled' | 'outlined'
} & Omit<ChipProps, 'color'>

type StyleChipProps = {
  styleProps: {
    clickable?: boolean
    onDelete?: (event: any) => void
    color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
    variant?: 'filled' | 'outlined'
  }
} & ChipProps
// ----------------------------------------------------------------------

const ChipStyle = styled((props: StyleChipProps) => <Chip {...props} />)(({ theme, styleProps }) => {
  const { color, variant, clickable, onDelete } = styleProps

  // Filled
  const styleFilled = (color) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    '& .MuiChip-icon': { color: 'inherit' },
    '& .MuiChip-avatar': {
      color: theme.palette[color].lighter,
      backgroundColor: theme.palette[color].dark,
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(theme.palette[color].contrastText, 0.7),
      '&:hover, &:active': { color: theme.palette[color].contrastText },
    },
  })

  const styleFilledClickable = (color) => ({
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.hoverOpacity),
    },
  })

  const styleFilledDeletable = (color) => ({
    '&:focus': {
      backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.focusOpacity),
    },
  })

  // Outlined
  const styleOutlined = (color) => ({
    color: theme.palette[color].main,
    border: `1px solid ${theme.palette[color].main}`,
    '&:focus, &.MuiChip-clickable:hover': {
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
    },
    '& .MuiChip-icon': { color: 'currentColor' },
    '& .MuiChip-avatar': {
      color: theme.palette[color].lighter,
      backgroundColor: theme.palette[color].dark,
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(theme.palette[color].main, 0.7),
      '&:hover, &:active': { color: theme.palette[color].main },
    },
  })

  return {
    ...(variant === 'filled'
      ? {
          ...styleFilled(color),
          ...(clickable && { ...styleFilledClickable(color) }),
          ...(onDelete && { ...styleFilledDeletable(color) }),
        }
      : {
          ...styleOutlined(color),
        }),
  }
})

const Mchip = forwardRef<HTMLDivElement, Props>(
  (
    {
      color = 'default',
      variant = 'filled',
      clickable: clickableProp,
      onDelete: onDeleteProp,
      className,
      children,
      ...other
    },
    ref,
  ) => {
    if (color === 'default' || color === 'primary' || color === 'secondary') {
      return (
        <Chip
          ref={ref}
          color={color}
          variant={variant}
          clickable={clickableProp && clickableProp}
          onDelete={onDeleteProp && onDeleteProp}
          {...other}
        />
      )
    }

    return (
      <ChipStyle
        ref={ref}
        variant={variant}
        clickable={clickableProp && clickableProp}
        onDelete={onDeleteProp && onDeleteProp}
        styleProps={{
          color,
          variant,
          clickable: clickableProp && clickableProp,
          onDelete: onDeleteProp && onDeleteProp,
        }}
        {...other}
      />
    )
  },
)

export default Mchip
