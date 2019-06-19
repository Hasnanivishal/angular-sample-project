import { browser, by, element } from 'protractor';

export class AppPage {

  public baseUrl = 'http://localhost:4200/';
  navigateTo() {
    return browser.get('/register');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
}
