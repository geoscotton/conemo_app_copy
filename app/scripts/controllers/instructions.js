(function() {
  'use strict';

  function InstructionsController($window, $http, Constants) {
    var studyIdentifierPath = '/api/study_identifier';
    var clientUuid = $window.device.uuid || Constants.DEFAULT_CLIENT_UUID;

    this.label = $window.l10nStrings.instructionsLabel;
    this.appVersion = $window.Conemo.Globals.VERSION;
    this.contentPath = 'views/instructions/' + $window.l10n + '.html';
    $http.get($window.Conemo.Globals.SERVER_URL + studyIdentifierPath +
              '?client_uuid=' + clientUuid)
         .then((function(result) {
           this.studyIdentifier = (result.data || {}).study_identifier;
         }).bind(this), function() { /* do nothing in the error callback */ });
  }

  angular.module('conemoApp.controllers')
         .controller(
           'InstructionsController',
           ['$window', '$http', 'Constants', InstructionsController]
         );
})()
