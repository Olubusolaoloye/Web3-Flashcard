export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 12,
  md: 18,
  lg: 22,
  xl: 28,
  /** Standard content card. */
  card: 26,
  /** Pastel icon tile. */
  tile: 18,
  full: 999,
};

export const typography = {
  display: { fontSize: 30, fontWeight: '800' as const, letterSpacing: -0.8, lineHeight: 37 },
  title: { fontSize: 23, fontWeight: '800' as const, letterSpacing: -0.5, lineHeight: 29 },
  heading: { fontSize: 18, fontWeight: '800' as const, letterSpacing: -0.3, lineHeight: 24 },
  subheading: { fontSize: 15, fontWeight: '700' as const, letterSpacing: -0.1 },
  body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 21 },
  bodyStrong: { fontSize: 14, fontWeight: '600' as const, lineHeight: 21 },
  caption: { fontSize: 12, fontWeight: '600' as const, letterSpacing: 0 },
  overline: { fontSize: 11, fontWeight: '800' as const, letterSpacing: 1 },
};

// Soft, wide, low-opacity lifts — the card look of the reference design.
// In dark mode components draw `colors.cardBorder` instead; see `colors.cardBordered`.
export const shadow = {
  sm: {
    shadowColor: '#2E1065',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  md: {
    shadowColor: '#2E1065',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  lg: {
    shadowColor: '#2E1065',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.12,
    shadowRadius: 36,
    elevation: 10,
  },
  /** Tinted lift for the violet primary button / docked CTA. */
  primary: {
    shadowColor: '#6C3BD9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
};
