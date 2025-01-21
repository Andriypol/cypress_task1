/// <reference types= 'cypress'/>

import HomePage from '../support/page_objects/homePage';
import LoginPage from '../support/page_objects/loginPage';

describe('Telnyx Log In Functionality', () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const email = Cypress.env('VALID_EMAIL');
    const password = Cypress.env('VALID_PASSWORD');
    
    beforeEach(() => {
        homePage.visit();
        homePage.clickOnLogin();
    });

    it('should display the login form', () => {
        loginPage.verifyFormVisible();
    });

    it('should log in successfully with valid credentials', () => {
        loginPage.login(email, password);
        loginPage.verifySuccessfulLogin();
    });

    it('should display an error for invalid credentials', () => {
        loginPage.login('invalidvova@yahoo.com', 'Password_123!');
        loginPage.verifyInvalidCredentialsError();
    });

    it('should show error on submitting blank form', () => {
        loginPage.elements.emailInput().click();
        loginPage.elements.passwordInput().click();
        loginPage.clickSubmit();
        loginPage.verifyBlankFormErrors();
    });
});