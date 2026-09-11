import { test, expect } from "@playwright/test";

/**
 * The existing funnel suite (configurator.spec.ts) only ever exercises
 * "natural-glow" — reasonably, since the funnel mechanics are identical for
 * every look. But that also means the other 5 looks' entries in
 * data/looks.json (defaultOptions referencing real option ids, imageUrl
 * pointing at a real file) have never actually been loaded by a real
 * browser. This is a cheap smoke pass over all six: load the configurator,
 * confirm the first category renders and its real default option is
 * preselected — catching a typo'd option id or a broken default without
 * re-running the whole funnel six times over.
 */
const looks = [
  { id: "natural-glow", name: "Natural Glow", defaultBase: "Light Coverage" },
  { id: "evening-drama", name: "Evening Drama", defaultBase: "Full Coverage" },
  { id: "soft-rose", name: "Soft Rose", defaultBase: "Medium Coverage" },
  { id: "golden-hour", name: "Golden Hour", defaultBase: "Medium Coverage" },
  { id: "urban-cool", name: "Urban Cool", defaultBase: "Light Coverage" },
  { id: "bridal-glow", name: "Bridal Glow", defaultBase: "Full Coverage" },
] as const;

test.describe("All looks load with their real defaults", () => {
  for (const look of looks) {
    test(`${look.name} (${look.id})`, async ({ page }) => {
      await page.goto(`/configure/${look.id}`);
      await expect(page.getByRole("heading", { name: "Base", exact: true })).toBeVisible();
      await expect(
        page.getByRole("button", { name: new RegExp(look.defaultBase, "i") }).first(),
      ).toHaveAttribute("aria-pressed", "true");
    });
  }

  test("homepage links each look to its own configurator", async ({ page }) => {
    await page.goto("/");
    for (const look of looks) {
      await expect(
        page.getByRole("link", { name: new RegExp(`Configure this look.*${look.name}`, "i") }),
      ).toHaveAttribute("href", `/configure/${look.id}`);
    }
  });
});
