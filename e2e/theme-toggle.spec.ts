import { test, expect } from "@playwright/test";

/**
 * ThemeToggle (components/layout/ThemeToggle.tsx) reads its initial state
 * from localStorage, falling back to prefers-color-scheme. Explicitly fixing
 * colorScheme here makes the "starts light" assumption independent of
 * whatever Playwright's own default happens to be.
 */
test.use({ colorScheme: "light" });

test.describe("Theme toggle", () => {
  test("switches the document theme and persists it across a reload", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Switch to dark mode" });
    await expect(toggle).toBeVisible();
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await toggle.click();

    await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/dark/);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page.reload();

    await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  // Regression coverage for a real bug found while writing this suite: the
  // class sync used to run only inside the click handler, so a visitor whose
  // *stored* preference disagreed with their current system preference got a
  // toggle button that already read correctly while the page itself was
  // still rendering the other theme, until they clicked again.
  test("a stored dark preference applies on first load even when the system prefers light", async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
