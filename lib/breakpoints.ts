export const bp = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export const mq = {
  sm: `@media (min-width: 480px)`,
  md: `@media (min-width: 768px)`,
  lg: `@media (min-width: 1024px)`,
  xl: `@media (min-width: 1280px)`,
} as const;
