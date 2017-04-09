import { EmojrPage } from './app.po';

describe('emojr App', () => {
  let page: EmojrPage;

  beforeEach(() => {
    page = new EmojrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
