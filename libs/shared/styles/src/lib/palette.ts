import { alpha, PaletteOptions } from '@mui/material/styles';

const createGradient = (color1: string, color2: string) => {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
};

// Setup Colors
const PRIMARY = {
  lighter: '#D2FBFA',
  light: '#76DEEA',
  main: '#2196BC',
  dark: '#105987',
  darker: '#062D5A',
};
const SECONDARY = {
  lighter: '#D4FBD9',
  light: '#7EE9A0',
  main: '#2BB673',
  dark: '#158364',
  darker: '#085750',
};
const INFO = {
  lighter: '#CCF0FD',
  light: '#68C0F6',
  main: '#0979E2',
  dark: '#0445A2',
  darker: '#01226C',
};
const SUCCESS = {
  lighter: '#E5FAD5',
  light: '#9AE17E',
  main: '#389E2A',

  dark: '#157118',
  darker: '##084B15',
};
const WARNING = {
  lighter: '#FFF3CC',
  light: '#FFD067',
  main: '#FF9E02',
  dark: '#B76301',
  darker: '#7A3800',
};
const ERROR = {
  lighter: '#FCE3D3',
  light: '#F2967C',
  main: '#D63128',
  dark: '#9A1423',
  darker: '#660722',
};

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
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

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
};

export interface Palettes {
  light: PaletteOptions;
  dark: PaletteOptions;
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
};
