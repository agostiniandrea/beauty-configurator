import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "tablet",
      // Chromium-engine tablet (CI only installs chromium — see
      // .github/workflows/pull-request-test-lint.yml). An iPad preset
      // would force WebKit, which isn't installed there.
      use: { ...devices["Galaxy Tab S9"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  // In CI the production server is already running (started for Lighthouse).
  // Locally, Playwright spins up `next dev` automatically.
  webServer: process.env.CI
    ? undefined
    : {
        command: "yarn dev",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
