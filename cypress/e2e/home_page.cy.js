/// <reference types= 'cypress'/>
import HomePage from '../support/page_objects/homePage.js';


describe('Telnyx Homepage Load Test', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should load the homepage successfully', () => {
    cy.title().should('not.be.empty');

    homePage.getHeader().should('be.visible');
    homePage.getFooter().should('be.visible');
    homePage.getMainContent().should('be.visible');
  });

  it('should load within acceptable time (3 seconds)', () => {
    homePage.measurePageLoadTime();
  });
});



