import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let appPage: AppPage;
  const baseUrl = 'http://localhost:4200/';

  beforeEach(() => {
    appPage = new AppPage();
  });

  // it('should redirect to Register page', () => {
  //   appPage.navigateTo();
  //   expect(browser.getCurrentUrl()).toEqual(baseUrl + 'register');
  // });
});
