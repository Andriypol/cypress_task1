
class SignUpPage {
    // Selectors
    elements = {
      registrationForm: 'form',
      emailLabel: 'label[for="email"]',
      firstNameLabel: 'label[for="first_name"]',
      lastNameLabel: 'label[for="last_name"]',
      passwordLabel: 'label[for="password"]',
      firstNameInput: 'input[name="first_name"]',
      lastNameInput: 'input[name="last_name"]',
      emailInput: 'input[name="email"]',
      passwordInput: 'input[name="password"]',
      termsAndConditionsCheckbox: '#terms_and_conditions',
      submitButton: 'button[type="submit"]',
      errorMessage: '.c-UUKrH-kDyeyw-type-error',
      verificationHeading: 'h1 span',
    };
  
    verifyRegistrationFormVisible() {
      cy.get(this.elements.registrationForm).should('be.visible');
      cy.get(this.elements.emailLabel).contains('Company email');
      cy.get(this.elements.firstNameLabel).contains('First name');
      cy.get(this.elements.lastNameLabel).contains('Last name');
      cy.get(this.elements.passwordLabel).contains('Password');
      cy.get(this.elements.firstNameInput).should('be.visible');
      cy.get(this.elements.lastNameInput).should('be.visible');
      cy.get(this.elements.emailInput).should('be.visible');
      cy.get(this.elements.passwordInput).should('be.visible');
      cy.get(this.elements.submitButton).should('be.visible');
    }
  
    fillRegistrationForm({ firstName, lastName, email, password, acceptTerms = false }) {
      cy.get(this.elements.firstNameInput).type(firstName);
      cy.get(this.elements.lastNameInput).type(lastName);
      cy.get(this.elements.emailInput).type(email);
      cy.get(this.elements.passwordInput).type(password);
      if (acceptTerms) {
        cy.get(this.elements.termsAndConditionsCheckbox).click();
      }
    }
  
    submitRegistrationForm() {
      cy.get(this.elements.submitButton).first().click();
    }
  
    verifySuccessfulRegistration() {
      cy.url().should('include', '/sign-up/verify-email');
      cy.get(this.elements.verificationHeading).should('have.text', 'One last step');
    }
  
    verifyErrorMessage(expectedMessage) {
      cy.get(this.elements.errorMessage).contains(expectedMessage);
    }
  }
  
  export default SignUpPage;