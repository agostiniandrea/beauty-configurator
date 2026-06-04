# Beauty Configurator — Project Context

Next.js 15 App Router · styled-components v6 · next-intl (EN + IT) · Tailwind v4

## Pre-PR checklist

Before opening any PR, run these three commands in order and confirm they all pass:

```bash
npm run test        # 31 unit tests — all must pass
npm run lint        # zero ESLint warnings or errors
npm run test:a11y   # Lighthouse accessibility audit — all pages must score 100
```

`test:a11y` does a production build and runs `@lhci/cli` (desktop preset) against four pages (homepage, configurator step, summary, complete). CI also runs a second mobile pass. Both fail if accessibility, best-practices, or SEO score below 100. This mirrors the Lighthouse steps in `.github/workflows/pull-request-test-lint.yml`.

## Architecture

| Concern | Approach |
|---|---|
| Routing | `app/[locale]/` — all pages under locale segment |
| i18n | next-intl; messages in `messages/en.json` + `messages/it.json` |
| Styling | styled-components for component styles; Tailwind for layout utilities in pages |
| Design tokens | All values (`--color-*`, `--font-*`, `--space-*`, etc.) defined in `app/globals.css` |
| Breakpoints | `lib/breakpoints.ts` exports `mq` for use in styled-components template literals |
| Hydration | All page body content rendered inside `lib/ClientOnly.tsx` to prevent browser-extension-induced hydration mismatches |

## Feature flags

Controlled via `site.config.ts`:

| Flag | Effect |
|---|---|
| `showPricing` | Shows per-option prices, running total, and "from €X" on LookCard |
| `enablePrint` | Print button on complete page |
| `enableEmailOrder` | Email button on complete page |
| `enableShare` | Copy-link button on complete page |

## Accessibility standard

Target: **WCAG 2.2 Level AA**, Lighthouse accessibility score 100 on all pages.

Key decisions:
- `<html lang>` set dynamically via `getLocale()` in root layout
- Skip link is first focusable element in Header (targets `#main-content`)
- Every page has `<main id="main-content">`
- OptionGrid uses arrow-key navigation (ARIA keyboard pattern for option lists)
- Color tokens meet 4.5:1 contrast on both light and dark themes
- `prefers-reduced-motion` respected via global CSS rule
