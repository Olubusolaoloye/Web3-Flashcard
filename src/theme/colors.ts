export const palette = {
  gold: '#F59E0B',
  goldDeep: '#B45309',
  purple: '#8B5CF6',
  purpleDeep: '#5B21B6',
  navyDeep: '#1E1B4B',
  cyan: '#22D3EE',
  emerald: '#10B981',
  orange: '#F97316',
  rose: '#EF4444',

  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#222735',
  slate900: '#0F172A',
  slate950: '#0B1120',

  white: '#FFFFFF',
  black: '#000000',
};

export type BlurTint = 'light' | 'dark' | 'default';

export interface ThemeColors {
  background: string;
  backgroundElevated: string;
  /** Top->bottom gradient for the ambient cinematic screen backdrop. */
  backgroundGradient: [string, string];
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  onPrimary: string;
  primaryMuted: string;
  secondary: string;
  success: string;
  successMuted: string;
  danger: string;
  dangerMuted: string;
  warning: string;
  overlay: string;
  /** Fixed dark gradient pair for "reveal" surfaces (e.g. flashcard backs) that always carries white text. */
  accentGradient: [string, string];
  /** Glassmorphism surface tokens: translucent tint layered over a BlurView. */
  glassTint: BlurTint;
  glassOverlay: string;
  glassBorder: string;
  glassHighlight: string;
}

export const lightColors: ThemeColors = {
  background: palette.slate50,
  backgroundElevated: palette.white,
  backgroundGradient: [palette.slate50, '#EEF0F5'],
  surface: palette.white,
  surfaceAlt: palette.slate100,
  border: palette.slate200,
  text: palette.slate900,
  textMuted: palette.slate500,
  textInverse: palette.white,
  primary: palette.gold,
  onPrimary: palette.slate900,
  primaryMuted: '#FEF3C7',
  secondary: palette.purple,
  success: palette.emerald,
  successMuted: '#ECFDF5',
  danger: palette.rose,
  dangerMuted: '#FEF2F2',
  warning: palette.orange,
  overlay: 'rgba(15, 23, 42, 0.5)',
  accentGradient: [palette.purple, palette.navyDeep],
  glassTint: 'light',
  glassOverlay: 'rgba(255, 255, 255, 0.55)',
  glassBorder: 'rgba(15, 23, 42, 0.08)',
  glassHighlight: 'rgba(255, 255, 255, 0.7)',
};

export const darkColors: ThemeColors = {
  background: '#07080D',
  backgroundElevated: '#0B0D14',
  backgroundGradient: ['#0B0D16', '#050609'],
  surface: palette.slate800,
  surfaceAlt: '#272F42',
  border: '#334155',
  text: palette.slate50,
  textMuted: palette.slate400,
  textInverse: palette.slate900,
  primary: palette.gold,
  onPrimary: palette.slate900,
  primaryMuted: 'rgba(245, 158, 11, 0.16)',
  secondary: '#A78BFA',
  success: '#34D399',
  successMuted: 'rgba(16, 185, 129, 0.16)',
  danger: '#F87171',
  dangerMuted: 'rgba(239, 68, 68, 0.16)',
  warning: '#FB923C',
  overlay: 'rgba(0, 0, 0, 0.6)',
  accentGradient: [palette.purple, palette.navyDeep],
  glassTint: 'dark',
  glassOverlay: 'rgba(255, 255, 255, 0.06)',
  glassBorder: 'rgba(255, 255, 255, 0.10)',
  glassHighlight: 'rgba(255, 255, 255, 0.14)',
};
