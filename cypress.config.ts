import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      options: {
        projectConfig: {
          root: ".",
          sourceRoot: "src",
          buildOptions: {
            outputPath: "dist/angular-xui",
            main: "src/public-api.ts",
            tsConfig: "tsconfig.lib.json",
          },
        },
      },
    },
    specPattern: "src/**/*.cy.ts",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: "http://localhost:4200",
    supportFile: "cypress/support/e2e.ts",
  },
});
