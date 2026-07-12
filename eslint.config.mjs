import js from "@eslint/js";
import globals from "globals";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import jestPlugin from "eslint-plugin-jest";
import storybook from "eslint-plugin-storybook";
import prettier from "eslint-config-prettier";

// eslint-config-next already registers the react, react-hooks, @next/next,
// jsx-a11y and typescript-eslint plugins — don't re-register them here or
// flat config throws on duplicate plugin names. For jsx-a11y we only merge
// in the recommended *rules* on top of Next's subset.
const config = [
  {
    ignores: [
      ".yarn/",
      ".next/",
      "node_modules/",
      "coverage/",
      "storybook-static/",
      "test-results/",
      "playwright-report/",
      "next-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...coreWebVitals,
  ...typescript,
  {
    files: ["**/*.{jsx,tsx}"],
    rules: { ...jsxA11y.flatConfigs.recommended.rules },
  },
  ...storybook.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  {
    files: ["components/**/__tests__/**", "jest.setup.tsx", "test-utils/**"],
    ...jestPlugin.configs["flat/recommended"],
  },
  // Must be last: turns off stylistic rules that would fight Prettier.
  prettier,
];

export default config;
