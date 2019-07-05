import { RegistrationPage } from './registration.po';
import { browser, by, element } from 'protractor';
import { LoginPage } from '../login-e2e/login.po';

describe('workspace-project Registration', () => {
    let registerPage: RegistrationPage;
    let loginPage: LoginPage;
    const baseUrl = 'http://localhost:4200/';

    beforeEach(() => {
        registerPage = new RegistrationPage();
        loginPage = new LoginPage();
    });

    it('should be register page', () => {
        registerPage.navigateTo();
        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'register');
        const text = registerPage.getTitleText();
        expect(text).toEqual('Registration Form');
    });

    it('should show validation messages if sign up button clicked without any user input', () => {
        const signUpButton = registerPage.getSubmitButton();
        signUpButton.click();

        const profileFormfirstNameRequiredError = registerPage.getFormFieldError('profileFormfirstNameRequiredError').getText();
        expect(profileFormfirstNameRequiredError).toEqual('First Name is required');

        const profileFormlastNameRequiredError = registerPage.getFormFieldError('profileFormlastNameRequiredError').getText();
        expect(profileFormlastNameRequiredError).toEqual('Last Name is required');

        const profileFormusernameRequiredError = registerPage.getFormFieldError('profileFormusernameRequiredError').getText();
        expect(profileFormusernameRequiredError).toEqual('Email is required');

        const profileFormpasswordRequiredError = registerPage.getFormFieldError('profileFormpasswordRequiredError').getText();
        expect(profileFormpasswordRequiredError).toEqual('Password is required');

        const profileFormconfirmPasswordRequiredError = registerPage.getFormFieldError('profileFormconfirmPasswordRequiredError').getText();
        expect(profileFormconfirmPasswordRequiredError).toEqual('Confirm Password is required');

        browser.sleep(5000);

    });

    it('should redirect to login page if linked is sign in linked is clicked', () => {
        const loginLink = registerPage.getLoginLink();
        expect(loginLink.getText()).toEqual('Log in');
        loginLink.click();

        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'login');
        browser.sleep(2000);

        const registerLink = loginPage.getRegistrationLink();
        expect(registerLink.getText()).toEqual('Sign up');
        registerLink.click();
        expect(browser.getCurrentUrl()).toEqual(baseUrl + 'register');
        browser.sleep(2000);
    });

    it('should register user if correct user inputs are provided', () => {
        const firstName = registerPage.getFormField('profileFormfirstName');
        firstName.sendKeys('Vishal');

        const profileFormlastName = registerPage.getFormField('profileFormlastName');
        profileFormlastName.sendKeys('Hasnani');

        const profileFormusername = registerPage.getFormField('profileFormusername');
        profileFormusername.sendKeys('hasnani.vishal@gmail.com');

        const profileFormpassword = registerPage.getFormField('profileFormpassword');
        profileFormpassword.sendKeys('Password123');

        const profileFormconfirmPassword = registerPage.getFormField('profileFormconfirmPassword');
        profileFormconfirmPassword.sendKeys('Password123');

        browser.sleep(2000);

        const signUpButton = registerPage.getSubmitButton();
        // signUpButton.click();

        // expect(browser.getCurrentUrl()).toEqual(baseUrl + 'login');
    });
});
