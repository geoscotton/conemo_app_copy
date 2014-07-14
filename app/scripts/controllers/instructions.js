'use strict';

angular.module('conemoAppApp')
  .controller('InstructionsCtrl', function ($scope, $rootScope) {

  $scope.instructionsLabel = l10nStrings.instructionsLabel;
  $scope.downloadTest = function() {
    $rootScope.downloader.download();
  };
  $scope.prompt = function(){
		var PurpleRobotClient = new PurpleRobot();
      	PurpleRobotClient.showNativeDialog({
        title: 'CONEMO',
        message: 'Login no aplicativo CONEMO',
        buttonLabelA: 'Sim',
        buttonLabelB: 'Noo',
        scriptA: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo'),
        scriptB: PurpleRobotClient.doNothing()
      }).execute();
  };
});	