var loginHelper = function (username,locale) {
  var userId = element(by.model('userId'));
  var dropdown = element(by.model('l10n'));
  var submit = element(by.id('submit'));

  userId.sendKeys(username);
  dropdown.sendKeys(locale);
  submit.click();

};

module.exports.loginHelper = loginHelper;