(function() {
  'use strict';

  function InstructionsController($window) {
    $window.localStorage['onResume'] = '';
    this.label = $window.l10nStrings.instructionsLabel;
    this.appVersion = $window.Conemo.Globals.VERSION;
    this.contentPath = 'views/instructions/' + $window.l10n + '.html';
  }

  angular.module('conemoApp.controllers')
         .controller(
           'InstructionsController',
           ['$window', InstructionsController]
         );
})()
