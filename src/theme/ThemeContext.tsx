import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, ThemeColors } from './colors';
import { radius, shadow, spacing, typography } from './spacing';
import { useProgress } from '../state/ProgressContext';

interface ThemeValue {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadow: typeof shadow;
}

const ThemeContext = createContext<ThemeValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const { progress } = useProgress();

  const scheme = useMemo<'light' | 'dark'>(() => {
    if (progress.darkModeOverride === 'system' || !progress.darkModeOverride) {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return progress.darkModeOverride;
  }, [progress.darkModeOverride, systemScheme]);

  const value = useMemo<ThemeValue>(
    () => ({
      scheme,
      colors: scheme === 'dark' ? darkColors : lightColors,
      spacing,
      radius,
      typography,
      shadow,
    }),
    [scheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
