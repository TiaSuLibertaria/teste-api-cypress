const {
  defineConfig
} = require("cypress");

module.exports = defineConfig({
  integration: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});