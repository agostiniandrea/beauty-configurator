# Beauty Configurator

An interactive beauty-look configurator. Clients choose a look, personalise it step by step (base, eyes, lips, cheeks), and receive a store card they can bring to the studio to have the look realised.

Built as a portfolio/product concept — designed to be white-labelled for independent make-up artists and beauty studios.

Live at **[beauty-configurator.vercel.app](https://beauty-configurator.vercel.app)**

---

## User flow

```
Homepage               Choose a look from the available catalogue
     ↓
Configurator           Step-by-step: one category per screen, options pre-selected
                       based on the chosen look, live summary panel on the right
     ↓
Summary review         Full overview of the selection — edit or confirm
     ↓
Completion / Store card  QR code + printable voucher to bring to the studio
```

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript |
| Styling | styled-components (components) + Tailwind CSS v4 (layout) |
| i18n | next-intl — EN / IT |
| QR code | qrcode.react |
| Fonts | Cormorant Garamond (heading) + DM Sans (body) via next/font |
| Testing | Jest + Testing Library |
| Visual testing | Storybook + Chromatic |
| Deploy | Vercel — push to `main` = production |

---

## Getting started

```bash
yarn install
yarn dev        # http://localhost:3000
```

The middleware redirects `/` to your browser's preferred locale (`/en` or `/it`).

---

## Commands

```bash
yarn dev              # Dev server
yarn build            # Production build
yarn lint             # ESLint
yarn test             # Jest — unit tests
yarn test:coverage    # Jest with coverage report
yarn storybook        # Storybook at http://localhost:6006
yarn chromatic        # Publish to Chromatic (requires CHROMATIC_PROJECT_TOKEN)
```

---

## Customisation

Everything site-level lives in **[site.config.ts](./site.config.ts)**:

| Field | What it controls |
|---|---|
| `name` | Site name in header, card, page titles |
| `tagline` | Hero headline (EN + IT) |
| `seo` | Default title, description, Open Graph |
| `contact.email` | "Send by email" recipient |
| `contact.studioName` | Shown on the store card |
| `contact.studioAddress` | Optional — shown on the store card |
| `contact.studioPhone` | Optional — shown on the store card |
| `features.showPricing` | Toggle price display everywhere |
| `features.enableEmailOrder` | Toggle the email CTA on the completion page |
| `features.enablePrint` | Toggle the print CTA |

Colors and typography live in [app/globals.css](./app/globals.css) as CSS custom properties.

---

## Content

Edit the files in `data/` to manage looks, categories, and options:

```
data/
  looks.json       # Available looks — includes defaultOptions per look
  categories.json  # Makeup categories (base, eyes, lips, cheeks)
  options.json     # Configurable options per category — includes imageUrl
```

Images live in `public/images/`. Each look and option references its image via `imageUrl` in the JSON.

Each localised string has an `en` and `it` field.

---

## CI / CD

| Workflow | Trigger |
|---|---|
| Chromatic | Push to `main` — publishes Storybook for visual diff |
| Test & Lint | Every PR — runs Jest + ESLint, auto-merges on success |

---

## Roadmap

- [x] AI-generated images per look and option
- [x] Incremental visual preview in summary panel
- [x] Options pre-selected based on chosen look
- [x] GitHub Actions — Chromatic + Test & Lint
- [ ] Styled-components migration (replace Tailwind inline classes)
- [ ] Selfie-based virtual try-on (MediaPipe FaceMesh)
- [ ] Animated step transitions
- [ ] Saved configurations (URL share / local storage)
- [ ] Booking form integration on the completion page
