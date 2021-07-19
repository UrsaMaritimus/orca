// ----------------------------------------------------------------------

export const remToPx = (value: string) => {
  return Math.round(parseFloat(value) * 16)
}

export const pxToRem = (value: number) => {
  return `${value / 16}rem`
}

export const responsiveFontSizes = ({ sm, md, lg }: { sm: number; md: number; lg: number }) => {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:960px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1280px)': {
      fontSize: pxToRem(lg),
    },
  }
}
