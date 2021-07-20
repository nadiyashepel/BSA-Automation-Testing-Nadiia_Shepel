const { expect } = require('chai');
const { App } = require('../src/pages');

const app = new App();

describe('Settings:', function () {

  beforeEach(async function () {
    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');

    await app.authPage.login({
      email: 'test@test.com',
      password: 'test@test.com'
    });

  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('should be able to change profile data', async function () {

    await app.profilePage.selectProfilePage();

    let inputData = {
      name: 'John',
      surname: 'Doe',
      day: 16,
      email: 'test@test.com',
      phone: '111111111111',
      status: 'doctor',
      gender: 'male'
    }

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/user-profile/f957809b-14bc-4ace-bf45-38e0aab43dfe';
      },
      { timeout: 5000 },
    );

    await app.profilePage.editProfile(inputData);

    let actualData = await app.profilePage.getProfile();

    expect(`${inputData.name} ${inputData.surname}`).to.be.eql(actualData.fullName);
    expect(inputData.gender).to.be.eql(actualData.gender);
    expect(`${inputData.day} November 1995`).to.be.eql(actualData.birthdate);
    expect(inputData.email).to.be.eql(actualData.email);
    expect(inputData.phone).to.be.eql(actualData.phone);
    expect(inputData.status).to.be.eql(actualData.status);


  });

  it('should be able to change specialty and clinic', async function () {

    let inputData = {
      speciality: 'surgeon',
      clinic: 'Hospital'
    }

    await app.profilePage.selectProfilePage();

    await app.profilePage.editDoctorSettings(inputData);



    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/user-profile/f957809b-14bc-4ace-bf45-38e0aab43dfe';
      },
      { timeout: 5000 },
    );

    let actualData = await app.profilePage.getDoctorSettings();

    expect(inputData.speciality).to.be.eql(actualData.speciality.toLowerCase());
    expect(inputData.clinic).to.be.eql(actualData.clinic);

  });

});