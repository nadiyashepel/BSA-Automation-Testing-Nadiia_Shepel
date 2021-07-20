const { Button, Input, Span } = require('../elements');
const { MainPage } = require('./main.page');

class ClinicsPage extends MainPage {
  constructor() {
    super();
    this.addButton = new Button('button=Add');
    this.nameFiled = new Input('input[name="name"]');
    this.addressField = new Input('input[name="address"]');
    this.statusDdl = new Button('div.selectStyles__control', 0);
    this.cityDdl = new Button('div.selectStyles__control', 1);
    this.ddlOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');
    this.submitButton = new Button('button[type="submit"]=Add');
    this.clickSpan = new Span('span.styles_title__3xRcc=NAME_TO_REPLACE');
  }


  async register({ name, address, status, city }) {
    await this.addButton.click();
    await this.nameFiled.setValue(name);
    await this.addressField.setValue(address);

    await this.statusDdl.click();
    await this.ddlOption.clickByText(status);

    await this.cityDdl.click();
    await this.ddlOption.clickByText(city);

    await this.submitButton.click();
  }

  async findClinicByName({ name }) {
    return this.clickSpan.getTextByName(name);
  }
}

module.exports = { ClinicsPage };