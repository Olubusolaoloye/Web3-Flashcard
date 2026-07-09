export const palette = {
  indigo: '#6366F1',
  indigoDark: '#4F46E5',
  violet: '#A855F7',
  cyan: '#22D3EE',
  emerald: '#10B981',
  amber: '#F59E0B',
  rose: '#EF4444',
  pink: '#EC4899',
  blue: '#3B82F6',

  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  slate950: '#0B1120',

  white: '#FFFFFF',
  black: '#000000',
};

export interface ThemeColors {
  background: string;
  backgroundElevated: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryMuted: string;
  secondary: string;
  success: string;
  successMuted: string;
  danger: string;
  dangerMuted: string;
  warning: string;
  overlay: string;
}

export const lightColors: ThemeColors = {
  background: palette.slate50,
  backgroundElevated: palette.white,
  surface: palette.white,
  surfaceAlt: palette.slate100,
  border: palette.slate200,
  text: palette.slate900,
  textMuted: palette.slate500,
  textInverse: palette.white,
  primary: palette.indigo,
  primaryMuted: '#EEF2FF',
  secondary: palette.violet,
  success: palette.emerald,
  successMuted: '#ECFDF5',
  danger: palette.rose,
  dangerMuted: '#FEF2F2',
  warning: palette.amber,
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export const darkColors: ThemeColors = {
  background: palette.slate950,
  backgroundElevated: palette.slate900,
  surface: palette.slate800,
  surfaceAlt: '#16213A',
  border: '#27324A',
  text: palette.slate50,
  textMuted: palette.slate400,
  textInverse: palette.slate900,
  primary: '#818CF8',
  primaryMuted: 'rgba(99, 102, 241, 0.16)',
  secondary: '#C084FC',
  success: '#34D399',
  successMuted: 'rgba(16, 185, 129, 0.16)',
  danger: '#F87171',
  dangerMuted: 'rgba(239, 68, 68, 0.16)',
  warning: '#FBBF24',
  overlay: 'rgba(0, 0, 0, 0.6)',
};
