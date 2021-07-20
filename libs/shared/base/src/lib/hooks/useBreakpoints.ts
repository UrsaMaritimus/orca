import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const useBreakpoints = (
  direction: string,
  firstkey: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  lastkey?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
) => {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()

  const upMatches = useMediaQuery(theme.breakpoints.up(firstkey))
  const dowMatches = useMediaQuery(theme.breakpoints.down(firstkey))

  if (direction === 'up') return upMatches
  if (direction === 'down') return dowMatches

  if (lastkey) {
    const betweenMatches = useMediaQuery(theme.breakpoints.between(firstkey, lastkey))
    if (direction === 'between') return betweenMatches
  }

  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}

// Usage
// const upMd = useBreakpoints('up','md') // > 960px
// const downMd = useBreakpoints('down','md') // < 960px
// const betweenSmMd = useBreakpoints('between','md', 'lg') // 960px ~ 1280px
