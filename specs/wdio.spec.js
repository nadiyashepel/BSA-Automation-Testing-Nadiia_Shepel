const { expect } = require('chai');

const randomNumber = () => Date.now();

describe('Registration:', function () {

  xit('should be able to register', async function () {

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-up');

    const usernameField = await $('input[name="name"]');
    const surnameField = await $('input[name="surname"]');
    const birthDateField = await $('input[name="birthdate"]');
    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const retryPasswordField = await $('input[name="retypePassword"]');
    const phoneField = await $('input[name="phone"]');

    const ddls = await $$('div.selectStyles__control');

    const genderDdl = ddls[0];
    const statusDdl = ddls[1];

    const femaleOption = await $('div.selectStyles__option=female');
    const doctorOption = await $('div.selectStyles__option=doctor');

    const signUpButton = await $('button');

    await usernameField.waitForDisplayed({ timeout: 5000 });
    await usernameField.setValue('Marcus');

    await surnameField.waitForDisplayed({ timeout: 5000 });
    await surnameField.setValue('Aurelius');

    await birthDateField.waitForDisplayed({ timeout: 5000 });
    await birthDateField.setValue('11/11/1999');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(`marcus${randomNumber()}@gmail.com`);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('Pa55word');

    await retryPasswordField.waitForDisplayed({ timeout: 5000 });
    await retryPasswordField.setValue('Pa55word');

    await phoneField.waitForDisplayed({ timeout: 5000 });
    await phoneField.setValue('380000000000');

    await genderDdl.waitForDisplayed({ timeout: 5000 });
    await genderDdl.click();

    await femaleOption.waitForDisplayed({ timeout: 5000 });
    await femaleOption.click();

    await statusDdl.waitForDisplayed({ timeout: 5000 });
    await statusDdl.click();

    await doctorOption.waitForDisplayed({ timeout: 5000 });
    await doctorOption.click();

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/doctors');
    
    await browser.reloadSession();
  });

  it('should be able to login', async function () {

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
    
    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const signUpButton = await $('button');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(`john_admin1@admin.com`);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('Pa55word');

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url === 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/doctors');
    
    await browser.reloadSession();

  });

  it('should not be able to login with wrong credentials', async function () {

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
    
    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const signUpButton = await $('button');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(`john_admin1@admin.com`);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('fakePassword');

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    await browser.waitUntil(
      async function () {
        const url = await browser.getUrl();
        return url !== 'http://46.101.234.121/doctors';
      },
      { timeout: 5000 },
    );

    const url = await browser.getUrl();
    expect(url).to.be.eql('http://46.101.234.121/sign-in');

    await browser.reloadSession();

  });

  it('should be able to add clinic', async function () {

    const email = 'john_admin2@admin.com';
    const password = 'Pa55word'

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
    
    const emailField = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const signUpButton = await $('button');

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(email);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);


    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    const clinicsButton = await $('a[href="/clinics"]');
    await clinicsButton.waitForDisplayed({ timeout: 5000 });
    await clinicsButton.click();

    const clinicName = `Shepel ${randomNumber()} clinic`;

    const addButton = await $('button=Add');
    await addButton.waitForDisplayed({ timeout: 5000 });
    await addButton.click();

    const nameField = await $('input[name="name"]');
    const addressField = await $('input[name="address"]');
    
    const ddls = await $$('div.selectStyles__control');

    const statusDdl = ddls[0];
    const cityDdl = ddls[1];

    const privateOption = await $('div.selectStyles__option=private');
    const rochesterOption = await $('div.selectStyles__option=Rochester, MN');

    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue(clinicName);

    await addressField.waitForDisplayed({ timeout: 5000 });
    await addressField.setValue(`Shevchenka, ${randomNumber()}`);

    await statusDdl.waitForDisplayed({ timeout: 5000 });
    await statusDdl.click();

    await privateOption.waitForDisplayed({ timeout: 5000 });
    await privateOption.click();

    await cityDdl.waitForDisplayed({ timeout: 5000 });
    await cityDdl.click();

    await rochesterOption.waitForDisplayed({ timeout: 5000 });
    await rochesterOption.click();

    const submitButton = await $('button[type="submit"]=Add');
    await submitButton.waitForDisplayed({ timeout: 5000 });
    await submitButton.click();
    
    const clinicNameSpan = await $(`span.styles_title__3xRcc=${clinicName}`);
    await clinicNameSpan.waitForDisplayed({ timeout: 5000 });
    clinicNameSpan.getText().then(element => console.log('clinicNameSpan', element));

    await browser.waitUntil(
      async function () {
        const clinicNameResult = await clinicNameSpan.getText();
        return clinicNameResult === clinicName;
      },
      { timeout: 5000 },
    );

    const clinicNameResult = await clinicNameSpan.getText();
    expect(clinicNameResult).to.be.eql(clinicName);

    await browser.reloadSession();
  });

  it('should be able to change profile data', async function () {

    const email = 'test@test.com';
    const password = 'test@test.com';

    const changedName = 'John';
    const changedSurname = 'Doe';
    const changedBirthday = '11/16/1995';
    const changedEmail = 'test@test.com';
    const changedPhone = '30612312342'
    const changedStatus = 'patient';
    const changedGender = 'male';

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
    
    const emailFieldToSignin = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const signUpButton = await $('button');

    await emailFieldToSignin.waitForDisplayed({ timeout: 5000 });
    await emailFieldToSignin.setValue(email);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    const profileButton = await $('a[href="/user-profile/f957809b-14bc-4ace-bf45-38e0aab43dfe"]');
    await profileButton.waitForDisplayed({ timeout: 5000 });
    await profileButton.click();

    const editButton = await $('button.styles_edit__ftuHl');
    await editButton.waitForDisplayed({ timeout: 5000 });
    await editButton.click();

    const usernameField = await $('input[name="name"]');
    const surnameField = await $('input[name="surname"]');
    const birthDateField = await $('input[name="birthdate"]');
    const emailField = await $('input[name="email"]');
    const phoneField = await $('input[name="phone"]');

    const ddls = await $$('div.selectStyles__control');

    const genderDdl = ddls[0];
    const statusDdl = ddls[1];

    const femaleOption = await $(`div.selectStyles__option=${changedGender}`);
    const doctorOption = await $(`div.selectStyles__option=${changedStatus}`);

    await usernameField.waitForDisplayed({ timeout: 10000 });
    await usernameField.setValue(changedName);

    await surnameField.waitForDisplayed({ timeout: 5000 });
    await surnameField.setValue(changedSurname);

    await genderDdl.waitForDisplayed({ timeout: 5000 });
    await genderDdl.click();

    await femaleOption.waitForDisplayed({ timeout: 5000 });
    await femaleOption.click();

    await birthDateField.waitForDisplayed({ timeout: 5000 });
    await birthDateField.click();

    const birthDateDayField = await $('div.react-datepicker__day--016');
    await birthDateDayField.waitForDisplayed({ timeout: 5000 });
    await birthDateDayField.click()

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(changedEmail);

    await phoneField.waitForDisplayed({ timeout: 5000 });
    await phoneField.setValue(changedPhone);

    await statusDdl.waitForDisplayed({ timeout: 5000 });
    await statusDdl.click();

    await doctorOption.waitForDisplayed({ timeout: 5000 });
    await doctorOption.click();

    const saveButton = await $('button[type="submit"]');
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();

    const expandButton = await $('button[type="button"]');
    await expandButton.waitForDisplayed({ timeout: 5000 });
    await expandButton.click();

    const logoutButton = await $('button.styles_without-border__3Vbp3[type="button"]');
    await logoutButton.waitForDisplayed({ timeout: 5000 });
    await logoutButton.click();

    await emailFieldToSignin.waitForDisplayed({ timeout: 5000 });
    await emailFieldToSignin.setValue(changedEmail);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    await profileButton.waitForDisplayed({ timeout: 5000 });
    await profileButton.click();

    await editButton.waitForDisplayed({ timeout: 5000 });
    await editButton.click();

    await usernameField.waitForDisplayed({ timeout: 5000 });
    const actualUsername = await usernameField.getValue();

    await surnameField.waitForDisplayed({ timeout: 5000 });
    const actualSurname = await surnameField.getValue();

    const selectorInputs = await $$('div.selectStyles__single-value');

    await selectorInputs[0].waitForDisplayed({ timeout: 5000 });
    const actualGender = await selectorInputs[0].getHTML(false);

    await birthDateField.waitForDisplayed({ timeout: 5000 });
    const actualBirthDate = await birthDateField.getValue();

    await emailField.waitForDisplayed({ timeout: 5000 });
    const actualEmail = await emailField.getValue();

    await phoneField.waitForDisplayed({ timeout: 5000 });
    const actualPhone = await phoneField.getValue();

    await selectorInputs[1].waitForDisplayed({ timeout: 5000 });
    const actualStatus = await selectorInputs[1].getHTML(false);

    expect(changedName).to.be.eql(actualUsername);
    expect(changedSurname).to.be.eql(actualSurname);
    expect(changedGender).to.be.eql(actualGender);
    expect(changedBirthday).to.be.eql(actualBirthDate);
    expect(changedEmail).to.be.eql(actualEmail);
    expect(changedPhone).to.be.eql(actualPhone);
    expect(changedStatus).to.be.eql(actualStatus);

    await browser.reloadSession();

  });

  it('should be able to change specialty and clinic', async function () {

    const email = 'test10@test.com';
    const password = 'test10@test.com';

    const changedSpeciality = 'surgeon';
    const changedClinic = 'Hospital';

    await browser.setWindowSize(1440, 960);
    await browser.url('/sign-in');
    
    const emailFieldToSignin = await $('input[name="email"]');
    const passwordField = await $('input[name="password"]');
    const signUpButton = await $('button');

    await emailFieldToSignin.waitForDisplayed({ timeout: 5000 });
    await emailFieldToSignin.setValue(email);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    const profileButton = await $('a[href="/user-profile/45543c35-096b-4a4e-954f-66aa3315d32d"]');
    await profileButton.waitForDisplayed({ timeout: 5000 });
    await profileButton.click();

    await browser.pause(2000);

    const ddls = await $$('div.selectStyles__control');

    const specialityDdl = ddls[0];
    const clinicDdl = ddls[1];
        
    await specialityDdl.waitForDisplayed({ timeout: 5000 });
    await specialityDdl.click();

    const optionDentist = await $(`div.selectStyles__option=${changedSpeciality}`);
    await optionDentist.waitForDisplayed({ timeout: 5000 });
    await optionDentist.click();

    const buttons = await $$('button[type="submit"]');

    const specialityButton = buttons[0];
    await specialityButton.waitForDisplayed({ timeout: 5000 });
    await specialityButton.click();
    
    await clinicDdl.waitForDisplayed({ timeout: 5000 });
    await clinicDdl.click();

    const optionHospital = await $(`div.selectStyles__option=${changedClinic}`);
    await optionHospital.waitForDisplayed({ timeout: 5000 });
    await optionHospital.click();

    const clinicButton = buttons[1];
    await clinicButton.waitForDisplayed({ timeout: 5000 });
    await clinicButton.click();

    const expandButton = await $('button[type="button"]');
    await expandButton.waitForDisplayed({ timeout: 5000 });
    await expandButton.click();

    const logoutButton = await $('button.styles_without-border__3Vbp3[type="button"]');
    await logoutButton.waitForDisplayed({ timeout: 5000 });
    await logoutButton.click();

    await emailFieldToSignin.waitForDisplayed({ timeout: 5000 });
    await emailFieldToSignin.setValue(email);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);

    await signUpButton.waitForDisplayed({ timeout: 5000 });
    await signUpButton.click();

    await profileButton.waitForDisplayed({ timeout: 5000 });
    await profileButton.click();

    const actualSpecialityField = await $('div.selectStyles__placeholder')
    actualSpecialityField.waitForDisplayed({ timeout: 5000 });
    const actualSpeciality = await actualSpecialityField.getHTML(false);

    const actualClinicField = await $('div.selectStyles__single-value')
    actualClinicField.waitForDisplayed({ timeout: 5000 });
    const actualClinic = await actualClinicField.getText(); 

    expect(changedSpeciality).to.equal(actualSpeciality);
    expect(changedClinic).to.equal(actualClinic);
    
    await browser.reloadSession();

  });

});
