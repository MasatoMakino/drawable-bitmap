import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: "webdriverio",
      name: "chrome",
      headless: true,
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
