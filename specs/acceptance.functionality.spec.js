const { expect } = require('chai');
const { App } = require('../src/pages');
const randomNumber = () => Date.now();

const app = new App();

describe('Functionality:', function () {

  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');

    await app.authPage.login({
      email: 'john_admin2@admin.com',
      password: 'Pa55word'
    });

  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should be able to add clinic', async function () {

    await app.clinicsPage.selectClinicsPage();

    const clinicName = `Shepel ${randomNumber()} clinic`;

    await app.clinicsPage.register({
      name: clinicName,
      address: `Shevchenka, ${randomNumber()}`,
      status: 'private',
      city: 'Rochester, MN'
    });

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/clinics';
      },
      { timeout: 5000 },
    );

    const actualClinicName = await app.clinicsPage.findClinicByName({ name: clinicName });
    expect(actualClinicName).to.be.eql(clinicName);

  });

});