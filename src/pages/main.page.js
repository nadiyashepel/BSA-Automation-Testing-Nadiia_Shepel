const { Button } = require('../elements');

class MainPage {
  constructor() {
    this.clinicButton = new Button('a[href="/clinics"]');
    this.profileButton = new Button('a[href="/user-profile/f957809b-14bc-4ace-bf45-38e0aab43dfe"]');
  }

  async selectClinicsPage() {
    this.clinicButton.click();
  }

  async selectProfilePage() {
    this.profileButton.click();
  }
}

module.exports = { MainPage }
