// Spectrum Dark Theme

export const theme = {
  colors: {
    // Backgrounds
    background: '#14141F',
    cardBackground: '#19192A',
    surface: '#23233A',
    divider: 'rgba(163,163,194,0.15)',

    // Text
    textPrimary: '#fff',
    textSecondary: '#A3A3C2',
    textLight: '#fff',
    textDark: '#14141F',

    // Accent
    primary: '#7B6FF0',
    secondary: '#23233A',
    accent: '#FFD057',
    info: '#A3A3C2',

    // Status
    error: '#FF3B30',
    warning: '#FFD057',
    success: '#7ED957',
    successLight: '#2ecc40',
    warningLight: '#ffe066',
    errorLight: '#FF6B6B',

    // Misc
    border: '#35354D',
    shadow: '#000',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 6,
    m: 8,
    l: 12,
    xl: 16,
  },
  fontSize: {
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 20,
    xxl: 24,
  },
  fontWeight: {
    regular: '400',
    medium: '600',
    bold: '700',
  },
};

export type Theme = typeof theme; 