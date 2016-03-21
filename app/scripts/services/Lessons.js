(function() {
  'use strict';

  function Lessons($rootScope, Constants, $window) {
    //Sort lessons by date to determine first lesson and schedule triggers
    this.getDateSortedLessons = function getDateSortedLessons() {
      return $rootScope.lessons.sort(function(a, b) {
        return a.dayInTreatment - b.dayInTreatment;
      });
    };

    this.scheduleNotifications = function scheduleNotifications() {
      if ($window.cordova.plugins == null) {
        return;
      }

      var lessonTime = Constants.LESSON_RELEASE_TRIGGER_TIME;
      $window.cordova.plugins.notification.local.schedule(
        this.getDateSortedLessons()
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
            })
      );
    };
  }

  angular
    .module('conemoApp.services')
    .service('Lessons', ['$rootScope', 'Constants', '$window', Lessons]);
})();
