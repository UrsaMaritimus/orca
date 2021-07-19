import { alpha, PaletteOptions } from '@material-ui/core/styles'

const createGradient = (color1: string, color2: string) => {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

// Setup Colors
const PRIMARY = {
  lighter: '#D8F9FF',
  light: '#8BE0FF',
  main: '#3EB5FF',
  dark: '#1F6AB7',
  darker: '#0B357A',
}
const SECONDARY = {
  lighter: '#E7E0FF',
  light: '#B6A4FF',
  main: '#8168FF',
  dark: '#4534B7',
  darker: '#1D137A',
}
const INFO = {
  lighter: '#E7F0FF',
  light: '#B8CEFF',
  main: '#89A8FF',
  dark: '#455CB7',
  darker: '#1A297A',
}
const SUCCESS = {
  lighter: '#F0FBCE',
  light: '#C0E86B',
  main: '#73B512',
  dark: '#478209',
  darker: '#275603',
}
const WARNING = {
  lighter: '#FFF9CC',
  light: '#FFE867',
  main: '#FFD002',
  dark: '#B78E01',
  darker: '#7A5A00',
}
const ERROR = {
  lighter: '#FFEBD6',
  light: '#FFB185',
  main: '#FF6135',
  dark: '#B7251A',
  darker: '#7A0A12',
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
}

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  color: {
    primary: { ...PRIMARY, contrastText: '#fff' },
    secondary: { ...SECONDARY, contrastText: '#fff' },
    info: { ...INFO, contrastText: '#fff' },
    success: { ...SUCCESS, contrastText: GREY[800] },
    warning: { ...WARNING, contrastText: GREY[800] },
    error: { ...ERROR, contrastText: '#fff' },
  },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
}

export interface Palettes {
  light: PaletteOptions
  dark: PaletteOptions
}

export const Palette: Palettes = {
  // LIGHT
  light: {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#fff',
      default: '#fff',
      neutral: GREY[200],
    },
    action: {
      active: GREY[600],
      ...COMMON.action,
    },
  },

  // DARK
  dark: {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
    },
    action: {
      active: GREY[500],
      ...COMMON.action,
    },
  },
}
