# Beauty Configurator — Project Context

Next.js 16 App Router · React 19 · styled-components v6 · next-intl v4 (EN + IT) · Tailwind v4 · TypeScript 6

## Pre-PR checklist

Before opening any PR, run these commands in order and confirm they all pass:

```bash
yarn typecheck      # tsc --noEmit
yarn test           # Jest unit tests — all must pass (coverage thresholds enforced)
yarn lint           # zero ESLint warnings or errors
yarn prettier:check # formatting
yarn e2e            # Playwright E2E (funnel EN + IT, booking form, store-card actions, theme, 404s); starts next dev automatically
yarn test:a11y      # Lighthouse accessibility audit — all pages must score 100
```

`test:a11y` does a production build and runs the local `@lhci/cli` binary (desktop preset) against four pages (homepage, configurator step, summary, complete). `yarn lhci:mobile` runs the mobile pass against an already-running server. Both fail if accessibility, best-practices, or SEO score below 100. This mirrors the Lighthouse and Playwright steps in `.github/workflows/pull-request-test-lint.yml`.

## Architecture

| Concern       | Approach                                                                                                                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Routing       | `app/[locale]/` — all pages under locale segment                                                                                                                                                                  |
| i18n          | next-intl; messages in `messages/en.json` + `messages/it.json`; `localePrefix: "as-needed"` — EN at the root (`/`), only IT prefixed (`/it`); internal links use `i18n/navigation.ts`, never `next/link` directly |
| Styling       | styled-components for component styles; Tailwind for layout utilities in pages                                                                                                                                    |
| Design tokens | All values (`--color-*`, `--font-*`, `--space-*`, etc.) defined in `app/globals.css`                                                                                                                              |
| Breakpoints   | `lib/breakpoints.ts` exports `mq` for use in styled-components template literals                                                                                                                                  |
| Hydration     | All page body content rendered inside `lib/ClientOnly.tsx` to prevent browser-extension-induced hydration mismatches                                                                                              |

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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
