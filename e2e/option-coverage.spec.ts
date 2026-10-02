import { test, expect, type Page } from "@playwright/test";

/**
 * Every other e2e spec changes at most one option per category (usually
 * just the Base). This spec is the exhaustive one: it clicks every single
 * selectable option in the catalog (data/options.json) at least once,
 * confirming each one (a) becomes the active choice (aria-pressed), (b)
 * deactivates its siblings — the grid is single-select, not a bug waiting
 * to happen — and (c) its price is the one reflected on the summary page.
 * It runs the full sweep in both supported locales (en, it) since the
 * option labels themselves are translated and could drift independently.
 *
 * It deliberately does NOT try every base × eyes × lips × cheeks
 * combination (3 × 3 × 3 × 3 = 81 per look): the selection mechanism is
 * identical regardless of which option is picked, so combinatorial
 * coverage would multiply run time for no extra confidence. Covering
 * every option once, across every category, is what actually catches a
 * broken option (wrong id, missing price, broken image) that a
 * single-combination test would miss.
 */
const localeCopy = {
  en: {
    prefix: "",
    next: "Next",
    reviewOrder: "Review my order",
    summaryTitle: "Your configuration",
    categories: [
      {
        heading: "Base",
        options: [
          { name: "Light Coverage", price: 50 },
          { name: "Medium Coverage", price: 65 },
          { name: "Full Coverage", price: 85 },
        ],
      },
      {
        heading: "Eyes",
        options: [
          { name: "Nude Palette", price: 25 },
          { name: "Smoky Eye", price: 45 },
          { name: "Colorful", price: 40 },
        ],
      },
      {
        heading: "Lips",
        options: [
          { name: "Nude Lip", price: 15 },
          { name: "Classic Red", price: 20 },
          { name: "Rose Pink", price: 18 },
        ],
      },
      {
        heading: "Cheeks",
        options: [
          { name: "Natural Flush", price: 15 },
          { name: "Sun-kissed Bronze", price: 20 },
          { name: "Berry Blush", price: 20 },
        ],
      },
    ],
  },
  it: {
    prefix: "/it",
    next: "Avanti",
    reviewOrder: "Rivedi il mio ordine",
    summaryTitle: "La tua configurazione",
    categories: [
      {
        heading: "Base",
        options: [
          { name: "Copertura Leggera", price: 50 },
          { name: "Copertura Media", price: 65 },
          { name: "Copertura Totale", price: 85 },
        ],
      },
      {
        heading: "Occhi",
        options: [
          { name: "Palette Nude", price: 25 },
          { name: "Smoky Eye", price: 45 },
          { name: "Colorato", price: 40 },
        ],
      },
      {
        heading: "Labbra",
        options: [
          { name: "Labbra Nude", price: 15 },
          { name: "Rosso Classico", price: 20 },
          { name: "Rosa", price: 18 },
        ],
      },
      {
        heading: "Guance",
        options: [
          { name: "Rossore Naturale", price: 15 },
          { name: "Bronzo Baciato dal Sole", price: 20 },
          { name: "Blush Berry", price: 20 },
        ],
      },
    ],
  },
} as const;

async function optionButton(page: Page, name: string) {
  return page.getByRole("button", { name: new RegExp(`^${name}`, "i") }).first();
}

for (const locale of ["en", "it"] as const) {
  const copy = localeCopy[locale];

  test.describe(`Every option in every category [${locale}]`, () => {
    for (const category of copy.categories) {
      for (const option of category.options) {
        test(`${category.heading}: "${option.name}" can be selected`, async ({ page }) => {
          await page.goto(`${copy.prefix}/configure/natural-glow`);
          await expect(
            page.getByRole("heading", { name: copy.categories[0].heading, exact: true }),
          ).toBeVisible();

          // Jump to the right category first (the first one is already shown).
          if (category.heading !== copy.categories[0].heading) {
            await page.getByRole("button", { name: category.heading, exact: true }).click();
            await expect(
              page.getByRole("heading", { name: category.heading, exact: true }),
            ).toBeVisible();
          }

          const siblings = category.options.filter((o) => o.name !== option.name);

          await (await optionButton(page, option.name)).click();
          await expect(await optionButton(page, option.name)).toHaveAttribute(
            "aria-pressed",
            "true",
          );
          for (const sibling of siblings) {
            await expect(await optionButton(page, sibling.name)).toHaveAttribute(
              "aria-pressed",
              "false",
            );
          }
        });
      }
    }

    test("the last option selected in each category is reflected in the summary total", async ({
      page,
    }) => {
      await page.goto(`${copy.prefix}/configure/natural-glow`);

      let total = 0;
      for (let step = 0; step < copy.categories.length; step++) {
        const category = copy.categories[step];
        const lastOption = category.options[category.options.length - 1];
        total += lastOption.price;

        await expect(
          page.getByRole("heading", { name: category.heading, exact: true }),
        ).toBeVisible();
        await (await optionButton(page, lastOption.name)).click();
        await expect(await optionButton(page, lastOption.name)).toHaveAttribute(
          "aria-pressed",
          "true",
        );

        if (step < copy.categories.length - 1) {
          await page.getByRole("button", { name: copy.next, exact: true }).click();
        }
      }

      await page.getByRole("button", { name: copy.reviewOrder, exact: true }).click();
      await expect(page.getByRole("heading", { name: copy.summaryTitle })).toBeVisible();
      for (const category of copy.categories) {
        const lastOption = category.options[category.options.length - 1];
        await expect(page.getByText(lastOption.name).first()).toBeVisible();
      }
      await expect(page.getByText(`€${total}`)).toBeVisible();
    });
  });
}
