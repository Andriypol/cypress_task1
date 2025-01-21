/// <reference types= 'cypress'/>
import navLinks from '../fixtures/menu_links.json';
import NavigationPage from '../support/page_objects/navigationMenu.js';
import HomePage from '../support/page_objects/homePage.js';

describe('Telnyx Navigation Menu Functionality Test', () => {
  const navigationPage = new NavigationPage();
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should display the navigation menu and all its links', () => {
    navigationPage.verifyNavigationMenuVisibility();
    navigationPage.verifyNavLinks();

    navigationPage.toggleExpandedMenu();
    navigationPage.verifyExpandedNavLinks();
  });

  it('should navigate to the correct pages when links are clicked', () => {
    navLinks.forEach((link) => {
      navigationPage.toggleExpandedMenu();
      navigationPage.navigateToPage(link.partialUrl);
      cy.url().should('include', link.partialUrl);
      navigationPage.visit(); // Return to the homepage
    });
  });
});