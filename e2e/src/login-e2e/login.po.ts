import { browser, element, by } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    getSubmitButton() {
        return element(by.id('LoginfromSignInButton'));
    }

    getFormField(fieldId: string) {
        return element(by.id(fieldId));
    }

    getFormFieldError(fieldErrorId: string) {
        return element(by.id(fieldErrorId));
    }

    getRegistrationLink() {
        return element(by.id('registerLink'));
    }
}
