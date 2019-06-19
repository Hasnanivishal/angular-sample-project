import { browser, by, element } from 'protractor';

export class RegistrationPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.id('registrationfromText')).getText();
  }

  getSubmitButton() {
    return element(by.id('registrationfromSignUpButton'));
  }

  getFormField(fieldId: string) {
    return element(by.id(fieldId));
  }

  getFormFieldError(fieldErrorId: string) {
    return element(by.id(fieldErrorId));
  }

  getLoginLink() {
    return element(by.id('loginLink'));
  }



}
