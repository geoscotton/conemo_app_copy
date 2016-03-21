'use strict';

angular.module('conemoAppApp')
  .controller('ToolboxCtrl', function ($scope, $rootScope, Resources) {

    $scope.availableLessons = [];
    Resources.getDaysInTreatment().then(function(daysInTreatment) {
      $scope.availableLessons = $rootScope.lessons.filter(function(el) {
        return el.dayInTreatment <= daysInTreatment;
      });
      $scope.$digest();
    });
    $scope.beginLessonButtonLabel = l10nStrings.beginLessonButtonLabel;
});
