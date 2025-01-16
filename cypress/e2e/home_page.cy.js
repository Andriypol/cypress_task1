/// <reference types= 'cypress'/>

describe('Telnyx Homepage Load Test', () => {
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the homepage successfully', () => {

      cy.title().should('not.be.empty');
  
      cy.get('header').should('be.visible'); 
      cy.get('footer').should('be.visible'); 
      cy.get('main').should('be.visible'); 

    });
  
   // Measure the page load time
      it('should load within acceptable time (3 seconds)', () => {

        cy.window().then((win) => {
          const performanceEntries = win.performance.getEntriesByType('navigation');
      
          if (performanceEntries.length > 0) {
            const navigationTiming = performanceEntries[0]; 
            const loadTime = navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;
            cy.log(`Page load time: ${loadTime}ms`);
            expect(loadTime).to.be.lessThan(3000); // Assert load time is under 3 seconds
          } else {
            throw new Error('Navigation timing data not available.');
          }
        });
      });
     
    });


