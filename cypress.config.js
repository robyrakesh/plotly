const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportWidth: 1350,
  viewportHeight: 900,
  videoCompression: 51,
  experimentalStudio: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      return config;
    },
    baseUrl: 'https://www.cypress.io',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
