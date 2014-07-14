'use strict';

var ContactPage = function() {
  this.appHelpButton = element(by.repeater('contactType in contactTypes').row(0));
  this.nurseAssistButton = element(by.repeater('contactType in contactTypes').row(1));
  this.connectionIssuesButton = element(by.repeater('contactType in contactTypes').row(2));
  this.successAlert = element(by.css('.alert-success'));

  this.get = function() {
    browser.get('http://localhost:9000/#/contact');
  };
};

describe('Contact Page', function() {
  var contactPage = new ContactPage();

  beforeEach(function() {
    contactPage.get();
  });

  it('should notify the user when help with the app is requested', function() {
    contactPage.appHelpButton.click();

    expect(contactPage.successAlert.getText())
      .toBe('Obrigado, a equipe do estudo foram contactados');
  });

  it('should notify the user when nurse assistance is requested', function() {
    contactPage.nurseAssistButton.click();

    expect(contactPage.successAlert.getText())
      .toBe('Obrigado, a equipe do estudo foram contactados');
  });

  it('should notify the user when connectivity issues are reported', function() {
    contactPage.connectionIssuesButton.click();

    expect(contactPage.successAlert.getText())
      .toBe('Obrigado, a equipe do estudo foram contactados');
  });
});
