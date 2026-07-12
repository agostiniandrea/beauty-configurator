/**
 * Typography tokens. Font family variables are set on <html> via next/font/google
 * and referenced in app/globals.css @theme.
 */
export const typography = {
  fontHeading: "var(--font-cormorant)",
  fontBody: "var(--font-dm-sans)",

  /** Scale used across the app */
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
} as const;
