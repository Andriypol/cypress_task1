const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    projectId: "ew3vt3",
    baseUrl: 'https://telnyx.com', 
    viewportWidth: 1440, 
    viewportHeight: 900, 
    defaultCommandTimeout: 8000, 
    pageLoadTimeout: 30000, 
    supportFile: 'cypress/support/e2e.js', 
    specPattern: 'cypress/e2e/**/*.cy.js', 
  },
});