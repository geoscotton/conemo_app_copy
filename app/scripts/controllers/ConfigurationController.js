(function(context) {
  'use strict';

  function ConfigurationController($rootScope, $window, $location, Constants) {
    var TOKENS_RESOURCE_PATH = '/api/authentication_tokens',
        TOKEN_CREATED_EVENT = 'authentication_token_created';

    this.configurationToken = '';

    this.tokenPattern = new RegExp(
      '(\\s*[^\\s]\\s*){' + Constants.CONFIGURATION_TOKEN_LENGTH + '}'
    );

    this.timestamp = (new Date()).valueOf();

    this.createAuthenticationToken = function createAuthenticationToken() {
      var tokens = Object.create(cbit.AuthenticationTokensResource);
      tokens.setUrl(context.Conemo.Globals.SERVER_URL + TOKENS_RESOURCE_PATH);
      tokens.setClientUuid($window.device.uuid || Constants.DEFAULT_CLIENT_UUID);

      return tokens.create(this.configurationToken).then(function(response) {
        $rootScope.$emit(TOKEN_CREATED_EVENT, response.data.value);
      }).catch(function(error) {
        $window.alert(error.message);
      });
    };
  }

  angular
    .module('conemoApp.controllers')
    .controller(
      'ConfigurationController',
      ['$rootScope', '$window', '$location', 'Constants',
       ConfigurationController]
    );
})(this);
