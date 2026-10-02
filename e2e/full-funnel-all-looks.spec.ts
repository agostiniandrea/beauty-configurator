import { test, expect } from "@playwright/test";

/**
 * configurator.spec.ts walks the complete funnel (configure → summary →
 * complete) only for "natural-glow"; all-looks.spec.ts smoke-tests the
 * other 5 looks (page loads, default option correct) but never finishes
 * their funnel. This closes that gap: every look is walked end to end,
 * with its own real default options and the real price total that results
 * — on every configured viewport (desktop/tablet/mobile, see
 * playwright.config.ts) and in both supported locales (en, it — see
 * i18n/routing.ts), so the funnel mechanics are proven for the full
 * catalog in both languages, not just one representative look in English.
 *
 * Prices come straight from data/options.json; see each look's comment for
 * the sum. If a look's defaultOptions or an option's price ever drifts,
 * the total assertion below will catch it. Option names mirror the en/it
 * translations in data/options.json.
 */
const localeCopy = {
  en: {
    prefix: "",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    next: "Next",
    reviewOrder: "Review my order",
    summaryTitle: "Your configuration",
    confirm: "Create my beauty card",
    completeTitle: "Your beauty card is ready",
  },
  it: {
    prefix: "/it",
    categories: ["Base", "Occhi", "Labbra", "Guance"],
    next: "Avanti",
    reviewOrder: "Rivedi il mio ordine",
    summaryTitle: "La tua configurazione",
    confirm: "Crea la mia beauty card",
    completeTitle: "La tua beauty card è pronta",
  },
} as const;

const looks = [
  {
    id: "natural-glow",
    name: "Natural Glow",
    optionNames: {
      en: ["Light Coverage", "Nude Palette", "Nude Lip", "Natural Flush"],
      it: ["Copertura Leggera", "Palette Nude", "Labbra Nude", "Rossore Naturale"],
    },
    // base-light 50 + eyes-nude 25 + lips-nude 15 + cheeks-natural 15
    total: "€105",
  },
  {
    id: "evening-drama",
    name: "Evening Drama",
    optionNames: {
      en: ["Full Coverage", "Smoky Eye", "Classic Red", "Sun-kissed Bronze"],
      it: ["Copertura Totale", "Smoky Eye", "Rosso Classico", "Bronzo Baciato dal Sole"],
    },
    // base-full 85 + eyes-smoky 45 + lips-red 20 + cheeks-bronze 20
    total: "€170",
  },
  {
    id: "soft-rose",
    name: "Soft Rose",
    optionNames: {
      en: ["Medium Coverage", "Nude Palette", "Rose Pink", "Berry Blush"],
      it: ["Copertura Media", "Palette Nude", "Rosa", "Blush Berry"],
    },
    // base-medium 65 + eyes-nude 25 + lips-pink 18 + cheeks-berry 20
    total: "€128",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    optionNames: {
      en: ["Medium Coverage", "Colorful", "Nude Lip", "Sun-kissed Bronze"],
      it: ["Copertura Media", "Colorato", "Labbra Nude", "Bronzo Baciato dal Sole"],
    },
    // base-medium 65 + eyes-colorful 40 + lips-nude 15 + cheeks-bronze 20
    total: "€140",
  },
  {
    id: "urban-cool",
    name: "Urban Cool",
    optionNames: {
      en: ["Light Coverage", "Colorful", "Classic Red", "Natural Flush"],
      it: ["Copertura Leggera", "Colorato", "Rosso Classico", "Rossore Naturale"],
    },
    // base-light 50 + eyes-colorful 40 + lips-red 20 + cheeks-natural 15
    total: "€125",
  },
  {
    id: "bridal-glow",
    name: "Bridal Glow",
    optionNames: {
      en: ["Full Coverage", "Nude Palette", "Rose Pink", "Natural Flush"],
      it: ["Copertura Totale", "Palette Nude", "Rosa", "Rossore Naturale"],
    },
    // base-full 85 + eyes-nude 25 + lips-pink 18 + cheeks-natural 15
    total: "€143",
  },
] as const;

for (const locale of ["en", "it"] as const) {
  const copy = localeCopy[locale];

  test.describe(`locale: ${locale}`, () => {
    for (const look of looks) {
      const optionNames = look.optionNames[locale];

      test(`full funnel with real defaults: ${look.name} (${look.id}) [${locale}]`, async ({
        page,
      }) => {
        await page.goto(`${copy.prefix}/configure/${look.id}`);

        // Walk every category without changing anything — proves the funnel
        // completes end to end on each look's own default selection.
        for (let step = 0; step < copy.categories.length; step++) {
          await expect(
            page.getByRole("heading", { name: copy.categories[step], exact: true }),
          ).toBeVisible();
          if (step === 0) {
            await expect(
              page.getByRole("button", { name: new RegExp(optionNames[0], "i") }).first(),
            ).toHaveAttribute("aria-pressed", "true");
          }
          if (step < copy.categories.length - 1) {
            await page.getByRole("button", { name: copy.next, exact: true }).click();
          }
        }

        await page.getByRole("button", { name: copy.reviewOrder, exact: true }).click();
        await expect(page.getByRole("heading", { name: copy.summaryTitle })).toBeVisible();
        for (const name of optionNames) {
          await expect(page.getByText(name).first()).toBeVisible();
        }
        await expect(page.getByText(look.total)).toBeVisible();

        await page.getByRole("link", { name: copy.confirm }).click();
        await expect(page.getByRole("heading", { name: copy.completeTitle })).toBeVisible();
        await expect(page.getByText(look.total)).toBeVisible();
      });
    }
  });
}
