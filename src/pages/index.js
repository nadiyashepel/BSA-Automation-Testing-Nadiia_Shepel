const { AuthPage } = require('./auth.page');
const { ClinicsPage } = require('./clinics.page');
const { ProfilePage } = require('./profile.page');

class App {
  constructor() {
    this.authPage = new AuthPage();
    this.clinicsPage = new ClinicsPage();
    this.profilePage = new ProfilePage();
  }
}

module.exports = { App };
