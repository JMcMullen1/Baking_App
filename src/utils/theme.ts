export const colors = {
  // Pastel primary colors
  primary: '#FFB4D6',        // Soft pink
  secondary: '#B4D4FF',      // Soft blue
  accent: '#FFD4B4',         // Soft peach
  background: '#FFF9F0',     // Cream white
  surface: '#FFFFFF',        // Pure white

  // Pastel utility colors
  success: '#C4E5C4',        // Soft green
  warning: '#FFE5B4',        // Soft yellow
  error: '#FFB4B4',          // Soft red
  info: '#D4E5FF',           // Soft sky blue

  // Text colors
  text: '#4A4A4A',           // Soft dark gray
  textLight: '#8A8A8A',      // Medium gray
  textInverse: '#FFFFFF',    // White

  // Bailey's colors (King Charles Cavalier)
  baileyPrimary: '#B4D4FF',  // Blue
  baileySecondary: '#E5F0FF', // Light blue

  // Nellie's colors (Golden Retriever)
  nelliePrimary: '#FFB4D6',  // Pink
  nellieSecondary: '#FFE5F0', // Light pink

  // Border and divider
  border: '#F0E5E5',
  divider: '#F5F0F0',

  // Shadows
  shadow: 'rgba(0, 0, 0, 0.08)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  round: 999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};
