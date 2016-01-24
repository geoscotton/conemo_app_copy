(function() {
  'use strict';

  function MainController($window, $scope, $rootScope, $http, $route,
                          startDateService, Constants) {
    //set up intervention start date
    $scope.setStartDate = startDateService.setStartDate;

    $scope.availableLocales = $window.l10nStrings.availableLocales;

    $scope.setLocale = function() {
        $window.l10n, $window.localStorage.l10n = this.locale;
    };

    //Sort lessons by date to determine first lesson and schedule triggers
    var dateSortedLessons = $rootScope.lessons.sort(function(a, b) {
      return a.dayInTreatment - b.dayInTreatment;
    });

    function lessonNotificationsAttrs() {
      var lessonTime = Constants.LESSON_RELEASE_TRIGGER_TIME;

      return dateSortedLessons
             .slice(1)
             .map(function notificationAttrs(lesson, index) {
               return {
                 id: index,
                 title: 'CONEMO',
                 text: lesson.title,
                 at: ($window.moment().add('d', lesson.dayInTreatment - 1))
                     .hour(lessonTime.hour)
                     .minute(lessonTime.minute)
                     .second(lessonTime.second)
                     .toDate()
               };
             });
    }

    function scheduleLessonNotifications() {
      var firstNotificationId = 0;

      if ($window.cordova.plugins == null) {
        return;
      }

      $window.cordova.plugins.notification.local.isPresent(
        firstNotificationId,
        function (isFirstNotificationPresent) {
          if (isFirstNotificationPresent) {
            return;
          }

          $window.cordova.plugins.notification.local.schedule(
            lessonNotificationsAttrs()
          );
        }
      );
    }

    var dateToday = new Date();
    $scope.setStartDate();
    scheduleLessonNotifications();

    $scope.enableStep = function(step) {
        $window.$('#'+step).removeClass('hidden');
    };

    var getRecentLesson = function(dateSortedLessons){
      var mostRecentLesson = {}; 
      var daysInTreatment = startDateService.getDaysInTreatment();

      dateSortedLessons.forEach(function(el, idx) {
        if (el.dayInTreatment <= daysInTreatment) {
          mostRecentLesson = el;
          mostRecentLesson.currentSessionIndex = idx + 1;
        }
      });

      return mostRecentLesson;
    }

    var mostRecentLesson = getRecentLesson(dateSortedLessons);

    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = $window.l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
    $scope.currentLessonGuid = mostRecentLesson.guid;
  }

  angular
    .module('conemoAppApp')
    .controller('MainCtrl',
                ['$window', '$scope', '$rootScope', '$http', '$route',
                 'startDateService', 'Constants', MainController]);
})();
