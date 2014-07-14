'use strict';
var loginHelper = require('./spec_helper.js').loginHelper;


var ConemoApp = function() {
  this.submit = element(by.id('submit'));

  this.get = function() {
    browser.get('http://localhost:9000/#/');
  };
};


describe('CONEMO app screen', function() {
  var conemoApp = new ConemoApp();
  var homeScreen = by.id('home-screen');

  beforeEach(function() {
    conemoApp.get();
  });

  it('should load the home screen when refreshed', function() {
    loginHelper('Furby','pt-BR');

    expect(element(homeScreen).getAttribute('class')).not.toMatch('ng-hide');
    // refresh
    conemoApp.get();
    expect(element(homeScreen).getAttribute('class')).not.toMatch('ng-hide');
  });

});
