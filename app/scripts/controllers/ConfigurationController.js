(function() {
  'use strict';

  function ConfigurationController($window, Constants) {
    var SERVICE_PATH = '/api/authentication_tokens';

    this.isReady = false;

    this.configurationToken = '';

    this.tokenLength = Constants.CONFIGURATION_TOKEN_LENGTH;

    this.createAuthenticationToken = function createAuthenticationToken() {
      var tokens = Object.create(cbit.AuthenticationTokensResource);
      tokens.setUrl(Constants.SERVER_URL + SERVICE_PATH);
      tokens.setClientUuid($window.device.uuid);
      tokens.create(this.configurationToken).then(function() {
      });
    };
  }

  angular
    .module('conemoAppApp')
    .controller('ConfigurationController',
                ['$window', 'Constants', ConfigurationController]);
})();
