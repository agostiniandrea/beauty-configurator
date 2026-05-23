/**
 * Color tokens — names that map to CSS custom properties defined in app/globals.css.
 * Import this when you need to reference a color in TypeScript (e.g. for inline styles).
 * For Tailwind classes, use the utility names directly (bg-brand-rose, text-brand-stone, etc.).
 */
export const colors = {
  background: "var(--color-background)",
  surface: "var(--color-surface)",
  border: "var(--color-border)",
  borderStrong: "var(--color-border-strong)",

  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
  textInverse: "var(--color-text-inverse)",

  brandRose: "var(--color-brand-rose)",
  brandMauve: "var(--color-brand-mauve)",
  brandTerracotta: "var(--color-brand-terracotta)",
  brandGold: "var(--color-brand-gold)",

  actionBg: "var(--color-action-bg)",
  actionBgHover: "var(--color-action-bg-hover)",
  actionText: "var(--color-action-text)",
} as const;
