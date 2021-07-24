import { FC, useEffect, useMemo, useState } from 'react';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@material-ui/core/styles';

import { StyledEngineProvider, CssBaseline } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import { useTheme } from 'next-themes';

import {
  Palette,
  Shadows,
  Typography,
  Shape,
  Breakpoints,
  ComponentsOverrides,
  ShadowExtension,
  GlobalStyles,
} from '@ursa/shared/styles';

const ThemeProvider: FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { theme, systemTheme } = useTheme();
  const themeMode = ((theme === 'system' ? systemTheme : theme) ?? 'dark') as
    | 'light'
    | 'dark';

  // Theme config
  const themeOptions = useMemo(
    () => ({
      palette: Palette[themeMode],
      shadows: Shadows[themeMode],
      shadowExtension: ShadowExtension[themeMode],
      typography: Typography,
      shape: Shape,
      breakpoints: Breakpoints,
    }),
    [themeMode]
  );
  const customTheme = createTheme(themeOptions);
  customTheme.components = ComponentsOverrides(customTheme);

  if (!mounted) return null;

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <GlobalStyles />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
