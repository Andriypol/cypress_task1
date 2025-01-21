
class HomePage {
    elements = {
        siteHeader: 'header',
        siteMain: 'main',
        siteFooter: 'footer',
        hamburgerIcon: 'button[aria-controls="main-menu-content"] svg[aria-hidden="true"]',
        errorAlert: '.MuiAlert-message',
        loginUrl: '/#/login/sign-in',
        signUpLink: '#main-menu a[href="/sign-up"]',
      };

    visit() {
      cy.visit('/');
    }
  
    getHeader() {
      return cy.get(this.elements.siteHeader);
    }
  
    getFooter() {
      return cy.get(this.elements.siteFooter);
    }
  
    getMainContent() {
      return cy.get(this.elements.siteMain);
    }
  
    getTitle() {
      return cy.title();
    }

    getHamburgerIcon() {
        return cy.get(this.elements.hamburgerIcon)
    }
    
    // URL verification
    verifyLoginPageUrl() {
        cy.url().should('include', this.elements.loginUrl);
    }

    // Navigation
    clickOnLogin() {
        cy.contains('a', 'Log in').invoke('removeAttr', 'target').click();
        this.verifyLoginPageUrl();
    }
    // Navigation to Sign Up
    navigateToSignUp() {
        cy.get(this.elements.signUpLink).click();
      }
    
    measurePageLoadTime() {
      cy.window().then((win) => {
        const performanceEntries = win.performance.getEntriesByType('navigation');
        if (performanceEntries.length > 0) {
          const navigationTiming = performanceEntries[0];
          const loadTime = navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;
          cy.log(`Page load time: ${loadTime}ms`);
          expect(loadTime).to.be.lessThan(3000);
        } else {
          throw new Error('Navigation timing data not available.');
        }
      });
    }
  }
  
  export default HomePage;