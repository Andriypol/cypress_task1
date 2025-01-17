const { defineConfig } = require('cypress');


module.exports = defineConfig({
  e2e: {
    projectId: Cypress.env('PROJECT_ID'),
    baseUrl: 'https://telnyx.com', 
    viewportWidth: 1440, 
    viewportHeight: 900, 
    defaultCommandTimeout: 8000, 
    pageLoadTimeout: 30000, 
    supportFile: 'cypress/support/e2e.js', 
    specPattern: 'cypress/e2e/**/*.cy.js',
    
  },
});