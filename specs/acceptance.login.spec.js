const { expect } = require('chai');
const { App } = require('../src/pages');

const app = new App();

describe('Authorization:', function () {

  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should be able to login', async function () {

    await app.authPage.login({
      email: 'john_admin1@admin.com',
      password: 'Pa55word'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/doctors');

  });

  it('should not be able to login with wrong credentials', async function () {

    await app.authPage.login({
      email: 'john_admin1@admin.com',
      password: 'fakePassword'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url !== 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/sign-in');

  });

});
