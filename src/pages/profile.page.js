const { Button, Input, Span, Div } = require('../elements');
const { MainPage } = require('./main.page');
const { ProfileEditPage } = require('./profile.edit.page');

class ProfilePage extends MainPage {
  constructor() {
    super()
    this.profileEditPage = new ProfileEditPage();
    this.editButton = new Button('button.styles_edit__ftuHl');
    this.statusField = new Div('div.styles_card__3sdTL');
    this.nameField = new Span('span.styles_name__2vTNE');
    this.genderField = new Span('span.styles_sex__sjUSu');
    this.birthdateField = new Span('span.styles_date__2rFkK');
    this.phoneField = new Span('a.styles_text__1HrCV', 0);
    this.emailField = new Span('a.styles_text__1HrCV', 1);
    this.specialityDdl = new Button('div.selectStyles__control', 0);
    this.clinicDdl = new Button('div.selectStyles__control', 1);
    this.ddlOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');
    this.specialityButton = new Button('button[type="submit"]', 0);
    this.clinicButton = new Button('button[type="submit"]', 1);
    this.specialityField = new Div('div.selectStyles__single-value', 0);
    this.clinicField = new Div('div.selectStyles__single-value', 1);
  }

  async editProfile(profileData) {
    await this.editButton.click();
    await this.profileEditPage.editProfile(profileData);

  }

  async getProfile() {
    return {
      fullName: await this.nameField.getText(),
      gender: await this.genderField.getText(),
      birthdate: await this.birthdateField.getText(),
      phone: await this.phoneField.getText(),
      email: await this.emailField.getText(),
      status: await this.statusField.getText(),
      gender: await this.genderField.getText()
    }
  }

  async editDoctorSettings({ speciality, clinic }) {

    await this.specialityDdl.click();
    await this.ddlOption.clickByText(speciality);
    await this.specialityButton.click();

    await this.clinicDdl.click();
    await this.ddlOption.clickByText(clinic);
    await this.clinicButton.click();
  }

  async getDoctorSettings() {
    return {
      speciality: await this.specialityField.getText(),
      clinic: await this.clinicField.getText()
    }
  }

}

module.exports = { ProfilePage }
