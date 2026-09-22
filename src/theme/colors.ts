// Web3 Academy design system — violet on lavender-tinted off-white.
//
// Light mode is the primary design: near-white lavender canvas, pure-white cards
// lifted with soft wide shadows, one saturated violet accent, pastel icon tiles.
// Dark mode keeps the same structure but swaps shadows for hairline borders,
// since shadows read as nothing on a dark surface.

export const palette = {
  violet: '#6C3BD9',
  violetBright: '#8B5CF6',
  violetDeep: '#4C1D95',
  violetInk: '#2E1065',
  lavender: '#EEEAFB',
  lavenderSoft: '#F6F4FD',

  // Pastel tile fills for category/icon chips.
  pastelViolet: '#EDE6FE',
  pastelBlue: '#E0EDFE',
  pastelMint: '#DCF5EA',
  pastelPeach: '#FDEBDD',
  pastelRose: '#FDE4EC',
  pastelLemon: '#FBF1D6',

  cyan: '#0EA5E9',
  emerald: '#10B981',
  amber: '#F59E0B',
  orange: '#F97316',
  rose: '#F43F5E',

  ink900: '#14121F',
  ink800: '#1F1B2E',
  ink700: '#2A2540',
  ink600: '#3B3557',

  gray50: '#FAFAFC',
  gray100: '#F3F2F8',
  gray200: '#E7E5F0',
  gray300: '#D4D1E0',
  gray400: '#A5A0BA',
  gray500: '#7C7694',
  gray600: '#5C5675',

  white: '#FFFFFF',
  black: '#000000',
};

export type BlurTint = 'light' | 'dark' | 'default';

export interface ThemeColors {
  background: string;
  backgroundElevated: string;
  /** Top->bottom gradient for the screen backdrop. Nearly flat in this design. */
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
  /** Fixed deep-violet gradient for "reveal" surfaces (flashcard backs, hero banners)
   * that always carry white text, in either scheme. */
  accentGradient: [string, string];
  /** Retained glass tokens — now used only for the translucent bottom nav. */
  glassTint: BlurTint;
  glassOverlay: string;
  glassBorder: string;
  glassHighlight: string;

  /** Solid bar behind the bottom tab nav. */
  navSurface: string;
  /** Hairline above the bottom tab nav. */
  navBorder: string;
  /** Colour of an inactive tab icon. */
  navInactive: string;
  /** Cards get a shadow in light mode and a visible border in dark mode;
   * this is the border colour a card should use. */
  cardBorder: string;
  /** Whether cards should draw a border instead of relying on a shadow. */
  cardBordered: boolean;
  /** Fill for search inputs and other inset fields. */
  inputFill: string;
  /** Warm accent used for rating stars. */
  star: string;
  /** Pastel tile fills, cycled by index for category grids. */
  tiles: [string, string, string, string, string, string];
  /** Saturated icon colours matching `tiles`, same order. */
  tileIcons: [string, string, string, string, string, string];
}

export const lightColors: ThemeColors = {
  background: palette.lavenderSoft,
  backgroundElevated: palette.white,
  backgroundGradient: [palette.lavenderSoft, palette.lavender],
  surface: palette.white,
  surfaceAlt: palette.gray100,
  border: palette.gray200,
  text: palette.ink900,
  textMuted: palette.gray500,
  textInverse: palette.white,
  primary: palette.violet,
  onPrimary: palette.white,
  primaryMuted: palette.pastelViolet,
  secondary: palette.cyan,
  success: palette.emerald,
  successMuted: '#E6F9F1',
  danger: palette.rose,
  dangerMuted: '#FEE9EF',
  warning: palette.orange,
  overlay: 'rgba(20, 18, 31, 0.45)',
  accentGradient: [palette.violet, palette.violetInk],
  glassTint: 'light',
  glassOverlay: 'rgba(255, 255, 255, 0.82)',
  glassBorder: 'rgba(20, 18, 31, 0.06)',
  glassHighlight: 'rgba(255, 255, 255, 0.9)',

  navSurface: palette.white,
  navBorder: palette.gray200,
  navInactive: palette.gray400,
  cardBorder: 'transparent',
  cardBordered: false,
  inputFill: palette.white,
  star: palette.amber,
  tiles: [
    palette.pastelViolet,
    palette.pastelBlue,
    palette.pastelMint,
    palette.pastelPeach,
    palette.pastelRose,
    palette.pastelLemon,
  ],
  tileIcons: ['#7C3AED', '#2563EB', '#059669', '#EA580C', '#DB2777', '#CA8A04'],
};

export const darkColors: ThemeColors = {
  background: '#12101F',
  backgroundElevated: '#181528',
  backgroundGradient: ['#12101F', '#0D0B17'],
  surface: '#1C1A2E',
  surfaceAlt: '#262340',
  border: '#332E4D',
  text: '#F5F3FB',
  textMuted: '#9A93B4',
  textInverse: palette.ink900,
  primary: palette.violetBright,
  onPrimary: palette.white,
  primaryMuted: 'rgba(139, 92, 246, 0.18)',
  secondary: '#38BDF8',
  success: '#34D399',
  successMuted: 'rgba(52, 211, 153, 0.16)',
  danger: '#FB7185',
  dangerMuted: 'rgba(251, 113, 133, 0.16)',
  warning: '#FB923C',
  overlay: 'rgba(0, 0, 0, 0.65)',
  accentGradient: [palette.violetBright, palette.violetDeep],
  glassTint: 'dark',
  glassOverlay: 'rgba(28, 26, 46, 0.86)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassHighlight: 'rgba(255, 255, 255, 0.12)',

  navSurface: '#181528',
  navBorder: '#2A2640',
  navInactive: '#6F688B',
  cardBorder: '#2C2845',
  cardBordered: true,
  inputFill: '#211E36',
  star: '#FBBF24',
  tiles: [
    'rgba(139, 92, 246, 0.18)',
    'rgba(56, 189, 248, 0.16)',
    'rgba(52, 211, 153, 0.16)',
    'rgba(251, 146, 60, 0.16)',
    'rgba(244, 114, 182, 0.16)',
    'rgba(250, 204, 21, 0.16)',
  ],
  tileIcons: ['#A78BFA', '#7DD3FC', '#6EE7B7', '#FDBA74', '#F9A8D4', '#FDE047'],
};
