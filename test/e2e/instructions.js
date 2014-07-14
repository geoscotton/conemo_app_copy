'use strict';

var InstructionsPage = function() {
  this.iconSign = element(by.css('.glyphicon-question-sign'));
  this.iconWrench = element(by.css('.glyphicon-wrench'));
  this.iconPhone = element(by.css('.glyphicon-phone'));
  this.notification = element(by.css('.alert-success'));

  this.get = function() {
    browser.get('http://localhost:9000/#/instructions');
  };
};

describe('Instructions Page', function() {
  var instructionsPage = new InstructionsPage();

  beforeEach(function() {
    instructionsPage.get();
  });

  it('should display instructions for how the app works', function() {
    expect(instructionsPage.iconSign.isPresent())
      .toBe(true);
  });

  it('should display instructions for the toolbox', function() {
    expect(instructionsPage.iconWrench.isPresent())
      .toBe(true);
  });

  it('should display instructions for the help section', function() {
    expect(instructionsPage.iconPhone.isPresent())
      .toBe(true);
  });
});
