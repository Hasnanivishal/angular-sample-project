import { browser, by, element } from 'protractor';
import { LoginPage } from './login.po';
import { RegistrationPage } from '../registration-e2e/registration.po';
import { AppPage } from '../app-e2e/app.po';

describe('workspace-project Login', () => {
    let loginPage: LoginPage;
    let registerPage: RegistrationPage;
    let appPage: AppPage;
    const baseUrl = 'http://localhost:4200/';

    beforeEach(() => {
        loginPage = new LoginPage();
        registerPage = new RegistrationPage();
        appPage = new AppPage();
    });

    it('should be login page', () => {
        loginPage.navigateTo();
        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'login');
    });

    it('should show validation messages if sign in button clicked without any user input', () => {
        const signUpButton = loginPage.getSubmitButton();
        signUpButton.click();

        const loginFormUsernameRequiredError = loginPage.getFormFieldError('loginFormUsernameRequiredError').getText();
        expect(loginFormUsernameRequiredError).toEqual('Email is required');

        const loginFormPasswordRequiredError = loginPage.getFormFieldError('loginFormPasswordRequiredError').getText();
        expect(loginFormPasswordRequiredError).toEqual('Password is required');


        browser.sleep(5000);

    });

    it('should redirect to register page if sign up linked is clicked', () => {
        browser.sleep(2000);

        const registerLink = loginPage.getRegistrationLink();
        expect(registerLink.getText()).toEqual('Sign up');
        registerLink.click();
        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'register');
        browser.sleep(2000);


        const loginLink = registerPage.getLoginLink();
        expect(loginLink.getText()).toEqual('Log in');
        loginLink.click();

        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'login');
    });

    it('should redirect to error page if bad login credentails provided', () => {
        const loginFormUsername = loginPage.getFormField('loginFormUsername');
        loginFormUsername.sendKeys('hasnani.vishal@gmail.com');
        const loginFormPassword = loginPage.getFormField('loginFormPassword');
        loginFormPassword.sendKeys('IforgetMyPassword');
        browser.sleep(5000);
        const signUpButton = loginPage.getSubmitButton();
        signUpButton.click();
        expect(appPage.getLoader()).toBeDefined();
        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'error');
    });

    it('should successfully login user if correct details provided', () => {
        const loginFormUsername = loginPage.getFormField('loginFormUsername');
        loginFormUsername.sendKeys('hasnani.vishal@gmail.com');
        const loginFormPassword = loginPage.getFormField('loginFormPassword');
        loginFormPassword.sendKeys('Password123');
        browser.sleep(5000);
        const signUpButton = loginPage.getSubmitButton();
        signUpButton.click();
        expect(appPage.getLoader()).toBeDefined();
        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'dashboard/home');
    });

    afterEach(() => {
        loginPage.navigateTo();
        browser.executeScript('window.localStorage.clear();');
    });
});
