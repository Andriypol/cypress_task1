/// <reference types= 'cypress'/>
import navLinks from '../fixtures/menu_links.json';


describe('Telnyx Navigation Menu Functionality Test', () => {
  
    beforeEach(() => {
      cy.visit('/');
    });
 
    it('should display the navigation menu and all its links', () => {
      // Verify that the navigation menu is visible
      cy.get('.c-ihSZrZ').should('be.visible');
      cy.get('.c-UazGY').should('be.visible');
      // Verify that each navigation link is visible and has a valid href
      cy.get('.c-ihSZrZ a').each(($link) => {
        cy.wrap($link).should('be.visible'); 
        cy.wrap($link)
          .invoke('attr', 'href')
          .should('not.be.empty');
      });
      
      cy.get("#main-menu-content button:first-child").click();

      cy.get('.c-UazGY nav a').each(($link) => {
        cy.wrap($link)
              .invoke('attr', 'href')
              .should('not.be.empty'); 
          })
    });
    
    it('should navigate to the correct pages when links are clicked', () => {
      navLinks.forEach((link) => {
        cy.get("#main-menu-content button:first-child").click();
        cy.visit(link.partialUrl)
        cy.url().should('include', link.partialUrl);
        cy.visit('/');
      });
    });
 
  });
