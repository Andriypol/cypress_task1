/// <reference types= 'cypress'/>
import viewports from '../fixtures/viewports.json';

describe('Telnyx Responsive Design Test', () => {
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    viewports.forEach(({ device, width, height }) => {

        beforeEach(() => {
          cy.viewport(width, height);
        });
  
        it(`should render the navigation menu correctly on ${device}`, () => {
  
          if (width <= 768) {
            // For smaller screens, ensure the hamburger menu is visible
            cy.get('button[aria-controls="main-menu-content"] svg[aria-hidden="true"]').should('be.visible');
          } else {
            // For larger screens, ensure the full menu is visible
            cy.get('button[aria-controls="main-menu-content"] svg[aria-hidden="true"]').should('not.be.visible');
          }
        });
        
      });
    });
 
  