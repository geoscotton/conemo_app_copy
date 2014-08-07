'use strict';

angular.module('conemoAppApp')
  .controller('ContactCtrl', function ($scope) {
  	$scope.contactHelpLabel = l10nStrings.contactHelpLabel;
    $scope.contactTypes = l10nStrings.contactTypes;
    $scope.thankYouAlert = l10nStrings.thankYouAlert;


    $scope.contactStaff = function(){

            var saveContents = {
                user_id: localStorage.userId,
                message: this.contactType,
                date_created: new Date(),
                l10n: localStorage.l10n
            };

        (new PurpleRobot()).emitReading('staff_messages', saveContents).execute();

    	$scope.successAlertVisible = true;

    }
  });
