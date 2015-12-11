'use strict';

angular.module('conemoAppApp')
  .controller('ToolboxCtrl', function ($scope, $rootScope, startDateService) {

	var daysInTreatment = startDateService.getDaysInTreatment();
   $scope.availableLessons = _.filter($rootScope.lessons, function(el) {
     return el.dayInTreatment <= daysInTreatment
   });
   $scope.beginLessonButtonLabel = l10nStrings.beginLessonButtonLabel;
});
