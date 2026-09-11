import { test, expect } from "@playwright/test";

/**
 * getLook(modelId) returning undefined triggers Next's notFound() on all
 * three configurator routes (configure/[modelId], its summary and complete
 * sub-routes) — never actually exercised by any existing test, since every
 * other spec always uses a real look id.
 */
test.describe("Unknown look id", () => {
  for (const path of [
    "/configure/does-not-exist",
    "/configure/does-not-exist/summary",
    "/configure/does-not-exist/complete",
  ]) {
    test(`${path} responds 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    });
  }
});
