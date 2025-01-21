/// <reference types= 'cypress'/>
import viewports from '../fixtures/viewports.json';
import HomePage from '../support/page_objects/homePage.js';

describe('Telnyx Responsive Design Test', () => {
    const homePage = new HomePage();
    
    beforeEach(() => {
      homePage.visit();
    });
  
    viewports.forEach(({ device, width, height }) => {

        beforeEach(() => {
          cy.viewport(width, height);
        });
  
        it(`should render the navigation menu correctly on ${device}`, () => {
  
          if (width <= 768) {
            // For smaller screens, ensure the hamburger menu is visible
            homePage.getHamburgerIcon().should('be.visible');
          } else {
            // For larger screens, ensure the full menu is visible
            homePage.getHamburgerIcon().should('not.be.visible');
          }
        });
        
      });
    });
 
  