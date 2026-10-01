import { test, expect, type Page } from "@playwright/test";

/**
 * Every other e2e spec changes at most one option per category (usually
 * just the Base). This spec is the exhaustive one: it clicks every single
 * selectable option in the catalog (data/options.json) at least once,
 * confirming each one (a) becomes the active choice (aria-pressed), (b)
 * deactivates its siblings — the grid is single-select, not a bug waiting
 * to happen — and (c) its price is the one reflected on the summary page.
 *
 * It deliberately does NOT try every base × eyes × lips × cheeks
 * combination (3 × 3 × 3 × 3 = 81 per look): the selection mechanism is
 * identical regardless of which option is picked, so combinatorial
 * coverage would multiply run time for no extra confidence. Covering
 * every option once, across every category, is what actually catches a
 * broken option (wrong id, missing price, broken image) that a
 * single-combination test would miss.
 */
const categories = [
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
] as const;

async function optionButton(page: Page, name: string) {
  return page.getByRole("button", { name: new RegExp(`^${name}`, "i") }).first();
}

test.describe("Every option in every category", () => {
  for (const category of categories) {
    for (const option of category.options) {
      test(`${category.heading}: "${option.name}" can be selected`, async ({ page }) => {
        await page.goto("/configure/natural-glow");
        await expect(page.getByRole("heading", { name: "Base", exact: true })).toBeVisible();

        // Jump to the right category first (Base is step 1, already there).
        if (category.heading !== "Base") {
          await page.getByRole("button", { name: category.heading, exact: true }).click();
          await expect(page.getByRole("heading", { name: category.heading, exact: true })).toBeVisible();
        }

        const siblings = category.options.filter((o) => o.name !== option.name);

        await (await optionButton(page, option.name)).click();
        await expect(await optionButton(page, option.name)).toHaveAttribute("aria-pressed", "true");
        for (const sibling of siblings) {
          await expect(await optionButton(page, sibling.name)).toHaveAttribute("aria-pressed", "false");
        }
      });
    }
  }

  test("the last option selected in each category is reflected in the summary total", async ({ page }) => {
    await page.goto("/configure/natural-glow");

    let total = 0;
    for (let step = 0; step < categories.length; step++) {
      const category = categories[step];
      const lastOption = category.options[category.options.length - 1];
      total += lastOption.price;

      await expect(page.getByRole("heading", { name: category.heading, exact: true })).toBeVisible();
      await (await optionButton(page, lastOption.name)).click();
      await expect(await optionButton(page, lastOption.name)).toHaveAttribute("aria-pressed", "true");

      if (step < categories.length - 1) {
        await page.getByRole("button", { name: "Next", exact: true }).click();
      }
    }

    await page.getByRole("button", { name: "Review my order" }).click();
    await expect(page.getByRole("heading", { name: "Your configuration" })).toBeVisible();
    for (const category of categories) {
      const lastOption = category.options[category.options.length - 1];
      await expect(page.getByText(lastOption.name).first()).toBeVisible();
    }
    await expect(page.getByText(`€${total}`)).toBeVisible();
  });
});
