import * as createPalette from '@mui/material/styles/createPalette';
import * as typography from '@mui/material/styles/createTypography';
import { Theme } from '@mui/material/styles/styles';

// Type declar for createPalette
declare module '@mui/material/styles/createPalette' {
  export interface IPaletteColorOptions {
    lighter?: string;
    light?: string;
    main?: string;
    dark?: string;
    darker?: string;
    contrastText?: string;
  }

  export interface IPaletteColor {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  }

  export interface PaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  export interface PaletteColor {
    lighter: string;
    darker: string;
  }

  export interface TypeBackground {
    default: string;
    paper: string;
    neutral: string;
  }

  export interface GRADIENT {
    primary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  }

  export interface CHART {
    violet: string[];
    blue: string[];
    green: string[];
    yellow: string[];
    red: string[];
  }

  export interface PaletteOptions {
    color: {
      primary?: IPaletteColorOptions;
      secondary?: IPaletteColorOptions;
      error?: IPaletteColorOptions;
      warning?: IPaletteColorOptions;
      info?: IPaletteColorOptions;
      success?: IPaletteColorOptions;
    };
    gradients?: GRADIENT;
    chart?: CHART;
  }

  export interface Palette {
    color: {
      primary: IPaletteColor;
      secondary: IPaletteColor;
      error: IPaletteColor;
      warning: IPaletteColor;
      info: IPaletteColor;
      success: IPaletteColor;
    };
    gradients: GRADIENT;
    chart: CHART;
  }
}

// Type declare for shape
declare module '@mui/system/createTheme/shape' {
  export interface Shape {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
}

// Type declare for shadow on the theme
declare module '@mui/material/styles/createTheme' {
  export interface IShadowExtension {
    z1: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    primary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  }

  export interface ThemeOptions {
    shadowExtension?: IShadowExtension;
  }

  export interface Theme {
    shadowExtension: IShadowExtension;
  }
}
