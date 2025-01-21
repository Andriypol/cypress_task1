class NavigationPage {
    // Selectors
    elements = {
      navigationMenu: '.c-ihSZrZ', // Main navigation menu
      expandedMenu: '.c-UazGY', // Expanded menu container
      navLinks: '.c-ihSZrZ a', // Links in the main navigation menu
      expandedNavLinks: '.c-UazGY nav a', // Links in the expanded menu
      menuToggleButton: '#main-menu-content button:first-child', // Button to toggle the expanded menu
    };
  
    verifyNavigationMenuVisibility() {
      cy.get(this.elements.navigationMenu).should('be.visible');
      cy.get(this.elements.expandedMenu).should('be.visible');
    }
  
    verifyNavLinks() {
      cy.get(this.elements.navLinks).each(($link) => {
        cy.wrap($link).should('be.visible');
        cy.wrap($link)
          .invoke('attr', 'href')
          .should('not.be.empty');
      });
    }
  
    toggleExpandedMenu() {
      cy.get(this.elements.menuToggleButton).click();
    }
  
    verifyExpandedNavLinks() {
      cy.get(this.elements.expandedNavLinks).each(($link) => {
        cy.wrap($link)
          .invoke('attr', 'href')
          .should('not.be.empty');
      });
    }
  
    navigateToPage(link) {
      cy.visit(link);
    }
  }
  
  export default NavigationPage;