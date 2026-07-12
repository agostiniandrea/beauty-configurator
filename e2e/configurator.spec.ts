import { test, expect, type Page } from "@playwright/test";

/**
 * End-to-end coverage of the configurator funnel:
 * home → configurator (4 categories) → summary → complete,
 * including query-string restore and back navigation, in EN and IT.
 *
 * Uses the "natural-glow" look, whose defaults are:
 * base-light, eyes-nude, lips-nude, cheeks-natural (total €105).
 */

const locales = [
  {
    locale: "en",
    // Default locale lives at the root — no /en prefix (localePrefix: "as-needed")
    prefix: "",
    ctaNaturalGlow: "Configure this look — Natural Glow",
    categories: ["Base", "Eyes", "Lips", "Cheeks"],
    next: "Next",
    reviewOrder: "Review my order",
    summaryTitle: "Your configuration",
    confirm: "Confirm order",
    edit: "Edit",
    completeTitle: "Order ready",
    defaultBase: "Light Coverage",
    changedBase: "Medium Coverage",
    restoredNames: ["Full Coverage", "Smoky Eye", "Classic Red", "Sun-kissed Bronze"],
  },
  {
    locale: "it",
    prefix: "/it",
    ctaNaturalGlow: "Configura questo look — Luminosità Naturale",
    categories: ["Base", "Occhi", "Labbra", "Guance"],
    next: "Avanti",
    reviewOrder: "Rivedi il mio ordine",
    summaryTitle: "La tua configurazione",
    confirm: "Conferma ordine",
    edit: "Modifica",
    completeTitle: "Ordine pronto",
    defaultBase: "Copertura Leggera",
    changedBase: "Copertura Media",
    restoredNames: ["Copertura Totale", "Smoky Eye", "Rosso Classico", "Bronzo Baciato dal Sole"],
  },
] as const;

type LocaleStrings = (typeof locales)[number];

async function optionButton(page: Page, name: string) {
  return page.getByRole("button", { name: new RegExp(name, "i") }).first();
}

/** Walk from the first category to the summary page, changing the base option. */
async function configureAndReview(page: Page, s: LocaleStrings) {
  await page.goto(`${s.prefix}/configure/natural-glow`);

  // Step 1 (Base): default preselected, switch to a non-default option.
  await expect(page.getByRole("heading", { name: s.categories[0] })).toBeVisible();
  await expect(await optionButton(page, s.defaultBase)).toHaveAttribute("aria-pressed", "true");
  await (await optionButton(page, s.changedBase)).click();
  await expect(await optionButton(page, s.changedBase)).toHaveAttribute("aria-pressed", "true");

  // Walk through the remaining categories.
  for (let step = 1; step < s.categories.length; step++) {
    await page.getByRole("button", { name: s.next, exact: true }).click();
    await expect(page.getByRole("heading", { name: s.categories[step] })).toBeVisible();
  }

  await page.getByRole("button", { name: s.reviewOrder }).click();
  await expect(page.getByRole("heading", { name: s.summaryTitle })).toBeVisible();
}

for (const s of locales) {
  test.describe(`funnel (${s.locale})`, () => {
    test("homepage lists looks and opens the configurator", async ({ page }) => {
      await page.goto(s.prefix || "/");
      await page.getByRole("link", { name: s.ctaNaturalGlow }).click();
      await expect(page).toHaveURL(`${s.prefix}/configure/natural-glow`);
      await expect(page.getByRole("heading", { name: s.categories[0] })).toBeVisible();
    });

    test("full funnel: configure, summary, complete", async ({ page }) => {
      await configureAndReview(page, s);

      // Summary reflects the changed selection in the URL and on the page.
      await expect(page).toHaveURL(/base=base-medium/);
      await expect(page.getByText(s.changedBase)).toBeVisible();

      await page.getByRole("link", { name: s.confirm }).click();
      await expect(page.getByRole("heading", { name: s.completeTitle })).toBeVisible();
      await expect(page).toHaveURL(/base=base-medium/);
      await expect(page.getByText(s.changedBase)).toBeVisible();
      // showPricing flag: base-medium 65 + eyes-nude 25 + lips-nude 15 + cheeks-natural 15
      await expect(page.getByText("€120")).toBeVisible();
    });

    test("back navigation from summary keeps the selection", async ({ page }) => {
      await configureAndReview(page, s);

      await page.getByRole("link", { name: s.edit }).click();
      await expect(page).toHaveURL(/base=base-medium/);

      // Jump back to the first category and check the changed option is active.
      await page.getByRole("button", { name: s.categories[0], exact: true }).click();
      await expect(await optionButton(page, s.changedBase)).toHaveAttribute("aria-pressed", "true");
    });

    test("summary restores a configuration from the query string", async ({ page }) => {
      await page.goto(
        `${s.prefix}/configure/natural-glow/summary?base=base-full&eyes=eyes-smoky&lips=lips-red&cheeks=cheeks-bronze`,
      );
      await expect(page.getByRole("heading", { name: s.summaryTitle })).toBeVisible();
      for (const name of s.restoredNames) {
        await expect(page.getByText(name).first()).toBeVisible();
      }
      // base-full 85 + eyes-smoky 45 + lips-red 20 + cheeks-bronze 20
      await expect(page.getByText("€170")).toBeVisible();
    });

    test("complete page restores a configuration from the query string", async ({ page }) => {
      await page.goto(
        `${s.prefix}/configure/natural-glow/complete?base=base-full&eyes=eyes-smoky&lips=lips-red&cheeks=cheeks-bronze`,
      );
      await expect(page.getByRole("heading", { name: s.completeTitle })).toBeVisible();
      await expect(page.getByText("€170")).toBeVisible();
    });
  });
}

test("pricing feature flag shows starting prices on the homepage", async ({ page }) => {
  await page.goto("/");
  // natural-glow defaults: 50 + 25 + 15 + 15
  await expect(page.getByText("from €105")).toBeVisible();
});

test.describe("locale prefix handling", () => {
  test("default locale is served at the root and /en redirects to /", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Your perfect look, configured.")).toBeVisible();
  });

  test("locale switcher toggles /it and returns without /en", async ({ page }) => {
    await page.goto("/configure/natural-glow?base=base-medium");

    await page.getByRole("link", { name: "Switch to Italiano" }).click();
    await expect(page).toHaveURL("/it/configure/natural-glow?base=base-medium");
    await expect(page.getByRole("button", { name: "Avanti", exact: true })).toBeVisible();

    await page.getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL("/configure/natural-glow?base=base-medium");
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeVisible();
  });
});
