/** @type {import('@lhci/cli').LighthouseConfig} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "yarn start",
      startServerReadyPattern: "Ready in",
      url: [
        "http://localhost:3000/en",
        "http://localhost:3000/en/configure/natural-glow",
        "http://localhost:3000/en/configure/natural-glow/summary",
        "http://localhost:3000/en/configure/natural-glow/complete",
      ],
      numberOfRuns: 1,
      settings: {
        onlyCategories: ["accessibility"],
        // Run against a fresh Chrome without extensions so extension-induced
        // DOM mutations don't interfere with the audit.
        chromeFlags: "--headless --no-sandbox --disable-extensions",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
