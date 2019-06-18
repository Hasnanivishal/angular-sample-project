import { AppPage } from './app.po';
import { RegistrationPage } from './registration.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let appPage: AppPage;
  let registerPage: RegistrationPage;

  beforeEach(() => {
    appPage = new AppPage();
    registerPage = new RegistrationPage();
  });

  it('should redirect to Register page', () => {
    appPage.navigateTo();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/register');
  });

  it('should be register page', () => {
    const text = element(by.id('registrationfromText')).getText();
    expect(text).toEqual('Registration Form');
  });

  it('should show validation messages if sign up button clicked without any user input', () => {
    const signUpButton = element(by.id('registrationfromSignUpButton'));
    browser.sleep(5000);
    signUpButton.click();
    const firstName = element(by.id('profileFormfirstName'));
    const profileFormfirstNameRequiredError = element(by.id('profileFormfirstNameRequiredError')).getText();
    expect(profileFormfirstNameRequiredError).toEqual('First Name is required');
  });

  it('should redirect to login page if linked is sign in linked is clicked', () => {
    const loginLink = element(by.id('loginLink'));
    expect(loginLink.getText()).toEqual('Log in');
    loginLink.click();
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
    const registerLink = element(by.id('registerLink'));
    expect(registerLink.getText()).toEqual('Sign up');
    registerLink.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/register');
  });


  it('should show Not validation messages if sign up button clicked and user entered correct inputs', () => {
    const signUpButton = element(by.id('registrationfromSignUpButton'));
    signUpButton.click();
    const firstName = element(by.id('profileFormfirstName'));
    firstName.sendKeys('Vishal');
    browser.sleep(5000);
    const profileFormfirstNameRequiredError = element(by.id('profileFormfirstNameRequiredError')).getText();
    expect(profileFormfirstNameRequiredError).not.toEqual('First Name is required');
  });
});
