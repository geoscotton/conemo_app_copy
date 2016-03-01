(function() {
  'use strict';

  function InstructionsController($window, $routeParams) {
    $window.localStorage['onResume'] = '';
    this.label = $window.l10nStrings.instructionsLabel;
    this.appVersion = $window.Conemo.Globals.VERSION;

    if ($routeParams.key == 'showSample'){
      $window.scrollTo(0, $window.document.body.scrollHeight);
    }
  }

  angular.module('conemoApp.controllers')
         .controller(
           'InstructionsController',
           ['$window', '$routeParams', InstructionsController]
         );
})()
