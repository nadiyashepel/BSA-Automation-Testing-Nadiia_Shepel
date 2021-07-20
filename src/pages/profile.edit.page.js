const { Button, Input, Span } = require('../elements');

const zeroPad = (num, places) => String(num).padStart(places, '0')

class ProfileEditPage {

  constructor() {
    this.usernameField = new Input('input[name="name"]');
    this.surnameField = new Input('input[name="surname"]');
    this.birthDateField = new Button('input[name="birthdate"]');
    this.emailField = new Input('input[name="email"]');
    this.phoneField = new Input('input[name="phone"]');
    this.genderDdl = new Button('div.selectStyles__control', 0);
    this.statusDdl = new Button('div.selectStyles__control', 1);
    this.dllOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');
    this.birthDateDayField = new Button('div.react-datepicker__day--TEXT_TO_REPLACE');
    this.saveButton = new Button('button[type="submit"]');
  }


  async editProfile({ name, surname, day, email, phone, gender, status }) {

    await this.usernameField.setValue(name);
    await this.surnameField.setValue(surname);
    await this.genderDdl.click();
    await this.dllOption.clickByText(gender);
    await this.birthDateField.click();
    await this.birthDateDayField.clickByText(zeroPad(day, 3))
    await this.emailField.setValue(email);
    await this.phoneField.setValue(phone);
    await this.statusDdl.click();
    await this.dllOption.clickByText(status);
    await this.saveButton.click();

  }
}

module.exports = { ProfileEditPage }
