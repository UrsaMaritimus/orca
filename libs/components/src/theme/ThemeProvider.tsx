import { FC, useEffect, useMemo, useState } from 'react';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

import { CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';

import {
  Palette,
  Shadows,
  Typography,
  Shape,
  Breakpoints,
  ComponentsOverrides,
  ShadowExtension,
  CustomGlobalStyles,
} from '@orca/theme';

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
    <MuiThemeProvider theme={responsiveFontSizes(customTheme)}>
      <CustomGlobalStyles />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
