'use strict';

angular.module('conemoAppApp')
  .controller('InstructionsCtrl', function ($scope, $rootScope) {

    $scope.instructionsLabel = l10nStrings.instructionsLabel;

    $scope.downloadLessons = function() {
      $rootScope.downloader.downloadSingle("https://conemo.northwestern.edu/lesson_api/lessons.json","android_asset/www/scripts/");
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