import { test, expect, type Page } from "@playwright/test";

/**
 * The three action buttons on StoreCard (components/complete/StoreCard.tsx)
 * have essentially no coverage beyond print, which the Jest suite already
 * mocks. Email and copy-link talk to real browser APIs (window.open,
 * clipboard) that jsdom can't meaningfully exercise, which is exactly what
 * E2E is for.
 *
 * window.open and window.print are monkey-patched before each click so the
 * assertions are deterministic — a real mailto: hand-off depends on whether
 * CI has a mail client registered, and window.print would otherwise invoke a
 * real (if headless-suppressed) print pipeline for no benefit to the test.
 */

const url =
  "/configure/natural-glow/complete?base=base-full&eyes=eyes-smoky&lips=lips-red&cheeks=cheeks-bronze";

async function spyOnWindow(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __openCalls: string[]; __printCalls: number };
    w.__openCalls = [];
    w.__printCalls = 0;
    window.open = (u?: string | URL) => {
      w.__openCalls.push(String(u));
      return null;
    };
    window.print = () => {
      w.__printCalls += 1;
    };
  });
}

test.describe("Store card actions", () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test("print button calls window.print and leaves the card usable", async ({ page }) => {
    await page.goto(url);
    await spyOnWindow(page);

    await page.getByRole("button", { name: "Print / Save as PDF" }).click();

    const printCalls = await page.evaluate(
      () => (window as unknown as { __printCalls: number }).__printCalls,
    );
    expect(printCalls).toBe(1);
    // The card itself is untouched — print didn't navigate away or crash the page.
    await expect(page.getByRole("article", { name: "Store card" })).toBeVisible();
  });

  test("email button opens a mailto with the order total and selections", async ({ page }) => {
    await page.goto(url);
    await spyOnWindow(page);

    await page.getByRole("button", { name: "Send by email" }).click();

    const calls = await page.evaluate(
      () => (window as unknown as { __openCalls: string[] }).__openCalls,
    );
    expect(calls).toHaveLength(1);
    const mailto = decodeURIComponent(calls[0]);
    expect(mailto).toContain("mailto:studio@beautyconfigurator.com");
    expect(mailto).toContain("My Beauty Configurator order");
    expect(mailto).toContain("Base: Full Coverage");
    // base-full 85 + eyes-smoky 45 + lips-red 20 + cheeks-bronze 20
    expect(mailto).toContain("Total: €170");
  });

  test("copy link button copies the order URL and confirms it", async ({ page }) => {
    await page.goto(url);

    const copyButton = page.getByRole("button", { name: "Copy link" });
    await copyButton.click();

    await expect(page.getByRole("button", { name: "Link copied!" })).toBeVisible();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("/configure/natural-glow/complete");
    expect(clipboardText).toContain("base=base-full");
  });
});
