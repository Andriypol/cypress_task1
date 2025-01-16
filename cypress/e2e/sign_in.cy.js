/// <reference types= 'cypress'/>
const { faker } = require('@faker-js/faker');

const email = faker.internet.email();
const name = faker.person.firstName();

describe('Telnyx Sign-Up Functionality', () => {
    
    beforeEach(() => {
      cy.visit('/');
      cy.get('#main-menu a[href="/sign-up"]').click();
    });
  
    it('should display the registration form', () => {
      // Verify that the registration form is visible
      cy.get('form').should('be.visible');
      cy.get('label[for="email"]').contains('Company email');
      cy.get('label[for="first_name"]').contains('First name');
      cy.get('label[for="last_name"]').contains('Last name');
      cy.get('label[for="password"]').contains('Password');
      // Check for input fields in the form
      cy.get('input[name="first_name"]').should('be.visible'); 
      cy.get('input[name="last_name"]').should('be.visible');  
      cy.get('input[name="email"]').should('be.visible');     
      cy.get('input[name="password"]').should('be.visible');  
      cy.get('button[type="submit"]').should('be.visible');   
    });
  
    it('should register successfully with valid data', () => {
      // Fill out the registration form with valid details
      cy.get('input[name="first_name"]').type('Volodymyr');
      cy.get('input[name="last_name"]').type('Dimado');
      cy.get('input[name="email"]').type(email); // Unique email
      cy.get('input[name="password"]').type('StrongPassword_123!');
      cy.get('#terms_and_conditions').click();
      // Submit the form
      cy.get('button[type="submit"]').first().click();
      cy.get('input[name="last_name"]').type(name);
      cy.wait(2000)
      cy.get('button[type="submit"]').first().click();
  
      // Assert success (adjust based on the website's behavior after registration)
      cy.url().should('include', '/sign-up/verify-email');
      cy.get('h1 span').should('have.text', 'One last step'); 
    });

    it('should show errors during registration with invalid data', () => {
        // Fill out the registration form with valid details
        cy.get('input[name="first_name"]').type('Andre');
        cy.get('input[name="last_name"]').type('Donnny');
        cy.get('input[name="email"]').type(`onetwoyahoo.com`); 
        cy.get('input[name="password"]').type('StrongPassword123!');
        cy.get('#terms_and_conditions').click();
        // Submit the form
        cy.get('button[type="submit"]').first().click();
        cy.get('.c-UUKrH-kDyeyw-type-error').contains('That email and password combination is not valid, or your browser could')
      });
});