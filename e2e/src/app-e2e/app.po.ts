import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/register');
  }

  getLoader() {
    return element(by.css('.loader'));
  }
}
