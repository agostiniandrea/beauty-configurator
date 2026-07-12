# Beauty Configurator — Project Context

Next.js 16 App Router · React 19 · styled-components v6 · next-intl v4 (EN + IT) · Tailwind v4 · TypeScript 6

## Pre-PR checklist

Before opening any PR, run these commands in order and confirm they all pass:

```bash
yarn typecheck      # tsc --noEmit
yarn test           # Jest unit tests — all must pass (coverage thresholds enforced)
yarn lint           # zero ESLint warnings or errors
yarn prettier:check # formatting
yarn e2e            # Playwright funnel tests (EN + IT); starts next dev automatically
yarn test:a11y      # Lighthouse accessibility audit — all pages must score 100
```

`test:a11y` does a production build and runs the local `@lhci/cli` binary (desktop preset) against four pages (homepage, configurator step, summary, complete). `yarn lhci:mobile` runs the mobile pass against an already-running server. Both fail if accessibility, best-practices, or SEO score below 100. This mirrors the Lighthouse and Playwright steps in `.github/workflows/pull-request-test-lint.yml`.

## Architecture

| Concern       | Approach                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| Routing       | `app/[locale]/` — all pages under locale segment                                                                     |
| i18n          | next-intl; messages in `messages/en.json` + `messages/it.json`                                                       |
| Styling       | styled-components for component styles; Tailwind for layout utilities in pages                                       |
| Design tokens | All values (`--color-*`, `--font-*`, `--space-*`, etc.) defined in `app/globals.css`                                 |
| Breakpoints   | `lib/breakpoints.ts` exports `mq` for use in styled-components template literals                                     |
| Hydration     | All page body content rendered inside `lib/ClientOnly.tsx` to prevent browser-extension-induced hydration mismatches |

## Feature flags

Controlled via `site.config.ts`:

| Flag               | Effect                                                            |
| ------------------ | ----------------------------------------------------------------- |
| `showPricing`      | Shows per-option prices, running total, and "from €X" on LookCard |
| `enablePrint`      | Print button on complete page                                     |
| `enableEmailOrder` | Email button on complete page                                     |
| `enableShare`      | Copy-link button on complete page                                 |

## Accessibility standard

Target: **WCAG 2.2 Level AA**, Lighthouse accessibility score 100 on all pages.

Key decisions:

- `<html lang>` set dynamically via `getLocale()` in root layout
- Skip link is first focusable element in Header (targets `#main-content`)
- Every page has `<main id="main-content">`
- OptionGrid uses arrow-key navigation (ARIA keyboard pattern for option lists)
- Color tokens meet 4.5:1 contrast on both light and dark themes
- `prefers-reduced-motion` respected via global CSS rule
