'use strict';

require('./helpers/setup');

var wd = require('wd'),
    serverConfigs = require('./helpers/appium-servers');

describe('Android features', function() {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function() {
    var serverConfig = serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);

    var desired = require('./helpers/desired-platforms').nexus4;
    return driver.init(desired);
  });

  after(function() {
    return driver.quit();
  });

  afterEach(function() {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it('displays the app sections', function() {
    return driver
      .context('WEBVIEW')
      .sleep(5000)
      .elementByLinkText('pt-BR')
        .click()
      .elementByLinkText('Baixar')
        .click()
      .sleep(30000);
  });
});
