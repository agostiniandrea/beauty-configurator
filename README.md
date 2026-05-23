# Beauty Configurator

An interactive beauty-look configurator. Clients choose a look, personalise it step by step (base, eyes, lips, cheeks…), and receive a store card they can bring to the studio to have the look realised.

Built as a portfolio/product concept. The data layer is designed to be swapped for Contentful when you're ready to go CMS-driven.

---

## User flow

```
Homepage               Choose a look from the available catalogue
     ↓
Configurator           Step-by-step: one category per screen, progress bar,
                       live summary panel on the right
     ↓
Summary review         Full overview of the selection — edit or confirm
     ↓
Completion / Store card  QR code + printable voucher to bring to the studio
                          Print button / Send by email button
```

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | next-intl — EN / IT |
| QR code | qrcode.react |
| Fonts | Cormorant Garamond (heading) + DM Sans (body) via next/font |
| Deploy | Vercel (push to `main` = production) |

---

## Customisation

Everything site-level lives in **[site.config.ts](./site.config.ts)** — no need to touch component code for typical changes:

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

**Colors and typography** live in [app/globals.css](./app/globals.css) as CSS custom properties — edit the `:root` block to retheme the whole site in one place.

---

## Content

Edit the JSON files in `data/` to manage looks, categories, and options:

```
data/
  looks.json       # Available looks / styles
  categories.json  # Makeup categories (eyes, lips, cheeks…)
  options.json     # Configurable options per category
```

Each localised string has an `en` and `it` field. When Contentful is ready, replace `lib/data.ts` with Contentful fetch calls — the components consume the same TypeScript types.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The middleware redirects `/` to your browser's preferred locale (`/en` or `/it`).

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Deploy (Vercel)

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Next.js — no extra configuration needed
3. Every push to `main` triggers a production deploy

---

## Roadmap

- [ ] Contentful integration (replace `lib/data.ts`)
- [ ] Real product images per option
- [ ] Animated step transitions
- [ ] Saved configurations (URL share / local storage)
- [ ] Booking form integration on the completion page
