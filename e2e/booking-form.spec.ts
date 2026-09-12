import { test, expect } from "@playwright/test";

/**
 * BookingForm (components/complete/BookingForm.tsx) has no coverage anywhere
 * else in the repo — no Jest test, no E2E. It's a client-only form: submit
 * opens a mailto: link (no backend) and then shows a success card. We
 * monkey-patch window.open before clicking submit so the assertion is
 * deterministic and doesn't depend on a mail client being registered in CI —
 * the same reasoning the existing StoreCard Jest test uses for window.print.
 */

const url =
  "/configure/natural-glow/complete?base=base-light&eyes=eyes-nude&lips=lips-nude&cheeks=cheeks-natural";

async function spyOnWindowOpen(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    (window as unknown as { __openCalls: string[] }).__openCalls = [];
    window.open = (u?: string | URL) => {
      (window as unknown as { __openCalls: string[] }).__openCalls.push(String(u));
      return null;
    };
  });
}

async function windowOpenCalls(page: import("@playwright/test").Page) {
  return page.evaluate(() => (window as unknown as { __openCalls: string[] }).__openCalls ?? []);
}

test.describe("Booking form", () => {
  test("submitting with the required fields opens a mailto with the order details and shows the success state", async ({
    page,
  }) => {
    await page.goto(url);
    await spyOnWindowOpen(page);

    await page.locator("#booking-name").fill("Jane Doe");
    await page.locator("#booking-email").fill("jane@example.com");
    await page.locator("#booking-phone").fill("+1 234 567 890");
    await page.locator("#booking-message").fill("Allergic to nothing in particular.");

    await page.getByRole("button", { name: "Book now" }).click();

    // Success card replaces the form entirely. Its copy must make clear that
    // this only opened an email draft — nothing has actually been sent yet.
    const success = page.getByRole("status");
    await expect(success).toBeVisible();
    await expect(
      success.getByRole("heading", { name: "Your request is ready to send" }),
    ).toBeVisible();
    await expect(success).toContainText("Nothing has been sent yet");
    await expect(page.locator("#booking-name")).toHaveCount(0);

    const calls = await windowOpenCalls(page);
    expect(calls).toHaveLength(1);
    const mailto = decodeURIComponent(calls[0]);
    expect(mailto).toContain("mailto:studio@beautyconfigurator.com");
    expect(mailto).toContain("Appointment request — Natural Glow");
    expect(mailto).toContain("Base: Light Coverage");
    // Name and email are required fields — they must actually reach the
    // studio via the email body, not just live in the (discarded) form state.
    expect(mailto).toContain("Jane Doe");
    expect(mailto).toContain("jane@example.com");
    expect(mailto).toContain("+1 234 567 890");
  });

  test("name and email are required — submitting blank leaves the form in place", async ({
    page,
  }) => {
    await page.goto(url);
    await spyOnWindowOpen(page);

    // Neither #booking-name nor #booking-email is filled in — native HTML5
    // `required` validation should block the submit before our handler runs.
    await page.getByRole("button", { name: "Book now" }).click();

    await expect(page.getByRole("status")).toHaveCount(0);
    await expect(page.locator("#booking-name")).toBeVisible();
    expect(await windowOpenCalls(page)).toHaveLength(0);
  });
});
