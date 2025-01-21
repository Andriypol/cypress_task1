class LoginPage {
    // Selectors
    elements = {
        loginForm: 'form[aria-label="loginForm"]',
        emailInput: 'input[name="email"]',
        passwordInput: 'input[name="password"]',
        submitButton: 'form[aria-label="loginForm"] button',
        errorAlert: '.MuiAlert-message',
        validationErrors: {
          labels: 'label.Mui-error',
          messages: 'p.Mui-error',
        },
        twoFactorMessage: 'div[data-testid="login.signin.subtitle"]',
        loginPageUrl: '/#/login/sign-in'
      };

    // URL verification
    verifyLoginPageUrl() {
        cy.url().should('include', this.elements.loginPageUrl);
    }

    // Actions
    typeEmail(email) {
        cy.get(this.elements.emailInput).type(email);
    }

    typePassword(password) {
        cy.get(this.elements.passwordInput).type(password);
    }

    clickSubmit() {
        cy.get(this.elements.submitButton).click();
    }

    login(email, password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickSubmit();
    }

    // Verifications
    verifyFormVisible() {
       cy.get(this.elements.loginForm).should('be.visible');
       cy.get(this.elements.emailInput).should('be.visible');
       cy.get(this.elements.passwordInput).should('be.visible');
       cy.get(this.elements.submitButton).should('be.visible');
    }

    verifySuccessfulLogin() {
        this.verifyLoginPageUrl();
        cy.get(this.elements.twoFactorMessage)
            .contains('Secure your account with Two-Factor');
    }

    verifyInvalidCredentialsError() {
        cy.get(this.elements.errorAlert).should('be.visible');
        this.verifyLoginPageUrl();
    }

    verifyBlankFormErrors() {
        // Verify input field validation states
        cy.get(this.elements.emailInput).should('have.attr', 'aria-invalid', 'true');
        cy.get(this.elements.passwordInput).should('have.attr', 'aria-invalid', 'true');

        // Verify error labels are visible
        cy.get(this.elements.validationErrors.labels).each(($label) => {
            cy.wrap($label).should('be.visible');
        });

        // Verify 'Required' error messages
        cy.get(this.elements.validationErrors.messages).each(($label) => {
            cy.wrap($label).contains('Required');
        });
    }
}

export default LoginPage;