/// <reference types= 'cypress'/>

const { faker } = require('@faker-js/faker');
import SignUpPage from '../support/page_objects/signupPage.js';
import HomePage from '../support/page_objects/homePage.js';

const email = faker.internet.email();
const name = faker.person.firstName();

describe('Telnyx Sign-Up Functionality', () => {
  const signUpPage = new SignUpPage();
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
    homePage.navigateToSignUp();
  });

  it('should display the registration form', () => {
    signUpPage.verifyRegistrationFormVisible();
  });

  it('should register successfully with valid data', () => {
    signUpPage.fillRegistrationForm({
      firstName: 'Volodymyr',
      lastName: 'Dimado',
      email,
      password: 'StrongPassword_123!',
      acceptTerms: true,
    });
    signUpPage.submitRegistrationForm();
    cy.get(signUpPage.elements.lastNameInput).type(name);
    cy.wait(2000);
    signUpPage.submitRegistrationForm();
    signUpPage.verifySuccessfulRegistration();
  });

  it('should show errors during registration with invalid data', () => {
    signUpPage.fillRegistrationForm({
      firstName: 'Andre',
      lastName: 'Donnny',
      email: 'onetwoyahoo.com', // Invalid email format
      password: 'StrongPassword123!',
      acceptTerms: true,
    });
    signUpPage.submitRegistrationForm();
    signUpPage.verifyErrorMessage(
      'That email and password combination is not valid, or your browser could'
    );
  });
});