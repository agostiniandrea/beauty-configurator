# Beauty Configurator

An interactive makeup look configurator. Choose a look, then personalise each category (base, eyes, lips, cheeks) with your preferred options.

Built as a portfolio/concept project — the data layer is designed to be replaced by Contentful when ready.

## Stack

- **Next.js 15** — App Router, server components
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — EN / IT localisation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The middleware redirects `/` to your browser's preferred locale (`/en` or `/it`).

## Project structure

```
app/
  [locale]/
    page.tsx                    # Looks listing (home)
    configure/[modelId]/
      page.tsx                  # Configurator shell (server)
      ConfiguratorClient.tsx    # Configurator UI (client, holds selection state)
components/
  Header.tsx
  LookCard.tsx
  CategoryNav.tsx
  OptionGrid.tsx
  SummaryPanel.tsx
lib/
  types.ts                      # Shared TypeScript types
  data.ts                       # Data access layer (swap for Contentful here)
data/
  looks.json                    # Available looks / styles
  categories.json               # Makeup categories
  options.json                  # Configurable options per category
messages/
  en.json
  it.json
```

## Adding content

Edit the JSON files in `data/` to add looks, categories, and options. Each localised string has an `en` and `it` field.

## Roadmap

- [ ] Contentful integration (replace `lib/data.ts`)
- [ ] Look preview images
- [ ] Selection share / export
- [ ] Pricing variants

## Deploy

Deployed on [Vercel](https://vercel.com). Push to `main` triggers a production deploy.
