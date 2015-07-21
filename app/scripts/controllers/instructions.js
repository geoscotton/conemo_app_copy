'use strict';

angular.module('conemoAppApp')
  .controller('InstructionsCtrl', function ($scope, $rootScope, $routeParams) {
    localStorage['onResume'] = '';
    $scope.instructionsLabel = l10nStrings.instructionsLabel;

    $scope.userId = localStorage.userId;

    if ($routeParams.key == 'showSample'){
        window.scrollTo(0,document.body.scrollHeight);
    }
});
