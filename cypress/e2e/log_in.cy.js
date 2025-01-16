/// <reference types= 'cypress'/>

describe('Telnyx Log In Functionality', () => {
    const email = Cypress.env('VALID_EMAIL');
    const password = Cypress.env('VALID_PASSWORD');
      
    beforeEach(() => {
      cy.visit('/');
      cy.contains('a', 'Log in').invoke('removeAttr', 'target').click();
      cy.url().should('include', '/#/login/sign-in');
    });
  
    it('should display the login form', () => {
      // Verify the login form is visible
      cy.get('form').should('be.visible');
      // Check for input fields and login button
      cy.get('input[name="email"]').should('be.visible'); 
      cy.get('input[name="password"]').should('be.visible');  
      cy.get('button[type="submit"]').should('be.visible');   
    });
  
    it('should log in successfully with valid credentials', () => {
      // Fill in valid login credentials
      cy.get('input[name="email"]').type(email); 
      cy.get('input[name="password"]').type(password);    
      // Submit the login form
      cy.get('form[aria-label="loginForm"] button').click();
      // Assert successful login
      cy.url().should('include', '/#/login/sign-in'); // Ensure the user is redirected
      cy.get('div[data-testid="login.signin.subtitle"]').contains('Secure your account with Two-Factor')
    });
  
    it('should display an error for invalid credentials', () => {
      // Fill in invalid login credentials
      cy.get('input[name="email"]').type('invalidvova@yahoo.com');
      cy.get('input[name="password"]').type('Password_123!');
      // Submit the login form
      cy.get('form[aria-label="loginForm"] button').click();
      // Assert error message
      cy.get('.MuiAlert-message').should('be.visible'); 
      cy.url().should('include', '/#/login/sign-in'); 
    });
  
    it('should show error on subbmitting blank form', () => {
      // Attempt to submit the form without filling in the fields
        cy.get('input[name="email"]').click();
        cy.get('input[name="password"]').click();
        cy.get('form[aria-label="loginForm"] button').click();
        // Assert validation errors
        cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true')
        cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true')
        cy.get('label.Mui-error').each(($label) => {
            cy.wrap($label).should('be.visible')
            });
        cy.get('p.Mui-error').each(($label) => {
        cy.wrap($label).contains('Required')
        });
    });
  });