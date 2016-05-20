(function() {
  'use strict';

  function MainController($window, $scope, Lessons, Resources) {
    // reverse any changes made in LessonController
    Resources.getDaysInTreatment().then(function(daysInTreatment) {
      var mostRecentLesson = {}; 

      Lessons.getDateSortedLessons().forEach(function(el, idx) {
        if (el.dayInTreatment <= daysInTreatment) {
          mostRecentLesson = el;
          mostRecentLesson.currentSessionIndex = idx + 1;
        }
      });

      $scope.currentLessonTitle = mostRecentLesson.title;
      $scope.currentLessonDay = (new Date()).getDate();
      $scope.l10n = $window.l10n;
      $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
      $scope.currentLessonGuid = mostRecentLesson.guid;
      $scope.$digest();
    });
  }

  angular
    .module('conemoAppApp')
    .controller('MainCtrl', ['$window', '$scope', 'Lessons', 'Resources', MainController]);
})();
