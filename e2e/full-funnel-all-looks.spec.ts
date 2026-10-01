import { test, expect } from "@playwright/test";

/**
 * configurator.spec.ts walks the complete funnel (configure → summary →
 * complete) only for "natural-glow"; all-looks.spec.ts smoke-tests the
 * other 5 looks (page loads, default option correct) but never finishes
 * their funnel. This closes that gap: every look is walked end to end,
 * with its own real default options and the real price total that results
 * — on every configured viewport (desktop/tablet/mobile, see
 * playwright.config.ts), so the funnel mechanics are proven for the full
 * catalog, not just one representative look.
 *
 * Prices come straight from data/options.json; see each case's comment
 * for the sum. If a look's defaultOptions or an option's price ever
 * drifts, the total assertion below will catch it.
 */
const looks = [
  {
    id: "natural-glow",
    name: "Natural Glow",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    optionNames: ["Light Coverage", "Nude Palette", "Nude Lip", "Natural Flush"],
    // base-light 50 + eyes-nude 25 + lips-nude 15 + cheeks-natural 15
    total: "€105",
  },
  {
    id: "evening-drama",
    name: "Evening Drama",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    optionNames: ["Full Coverage", "Smoky Eye", "Classic Red", "Sun-kissed Bronze"],
    // base-full 85 + eyes-smoky 45 + lips-red 20 + cheeks-bronze 20
    total: "€170",
  },
  {
    id: "soft-rose",
    name: "Soft Rose",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    optionNames: ["Medium Coverage", "Nude Palette", "Rose Pink", "Berry Blush"],
    // base-medium 65 + eyes-nude 25 + lips-pink 18 + cheeks-berry 20
    total: "€128",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    optionNames: ["Medium Coverage", "Colorful", "Nude Lip", "Sun-kissed Bronze"],
    // base-medium 65 + eyes-colorful 40 + lips-nude 15 + cheeks-bronze 20
    total: "€140",
  },
  {
    id: "urban-cool",
    name: "Urban Cool",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    optionNames: ["Light Coverage", "Colorful", "Classic Red", "Natural Flush"],
    // base-light 50 + eyes-colorful 40 + lips-red 20 + cheeks-natural 15
    total: "€125",
  },
  {
    id: "bridal-glow",
    name: "Bridal Glow",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    optionNames: ["Full Coverage", "Nude Palette", "Rose Pink", "Natural Flush"],
    // base-full 85 + eyes-nude 25 + lips-pink 18 + cheeks-natural 15
    total: "€143",
  },
] as const;

for (const look of looks) {
  test(`full funnel with real defaults: ${look.name} (${look.id})`, async ({ page }) => {
    await page.goto(`/configure/${look.id}`);

    // Walk every category without changing anything — proves the funnel
    // completes end to end on each look's own default selection.
    for (let step = 0; step < look.categories.length; step++) {
      await expect(page.getByRole("heading", { name: look.categories[step], exact: true })).toBeVisible();
      if (step === 0) {
        await expect(
          page.getByRole("button", { name: new RegExp(look.optionNames[0], "i") }).first(),
        ).toHaveAttribute("aria-pressed", "true");
      }
      if (step < look.categories.length - 1) {
        await page.getByRole("button", { name: "Next", exact: true }).click();
      }
    }

    await page.getByRole("button", { name: "Review my order" }).click();
    await expect(page.getByRole("heading", { name: "Your configuration" })).toBeVisible();
    for (const name of look.optionNames) {
      await expect(page.getByText(name).first()).toBeVisible();
    }
    await expect(page.getByText(look.total)).toBeVisible();

    await page.getByRole("link", { name: "Create my beauty card" }).click();
    await expect(page.getByRole("heading", { name: "Your beauty card is ready" })).toBeVisible();
    await expect(page.getByText(look.total)).toBeVisible();
  });
}
