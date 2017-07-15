import { AngularCLIQuestionsPage } from './app.po';

describe('angular-cli-questions App', function() {
  let page: AngularCLIQuestionsPage;

  beforeEach(() => {
    page = new AngularCLIQuestionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
