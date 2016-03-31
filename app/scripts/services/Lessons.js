(function() {
  'use strict';

  function Lessons($rootScope, Constants, Resources, $window) {
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

      Resources.fetchEarliestStartDate().then((function(startDates) {
        if (startDates.length > 0) {
          var lessonTime = Constants.LESSON_RELEASE_TRIGGER_TIME;
          $window.cordova.plugins.notification.local.schedule(
            this.getDateSortedLessons()
                .slice(1)
                .filter(function(lesson) {
                  // only schedule future notifications
                  return  $window.moment(startDates[0].date)
                                 .hour(lessonTime.hour)
                                 .minute(lessonTime.minute)
                                 .second(lessonTime.second)
                                 .add(lesson.dayInTreatment - 1, 'd')
                                 .isAfter();
                })
                .map(function notificationAttrs(lesson, index) {
                  return {
                    id: index,
                    title: 'CONEMO',
                    text: lesson.title,
                    at: $window.moment(startDates[0].date)
                               .hour(lessonTime.hour)
                               .minute(lessonTime.minute)
                               .second(lessonTime.second)
                               .add(lesson.dayInTreatment - 1, 'd')
                               .toDate()
                  };
                })
          );
        }
      }).bind(this));
    };
  }

  angular
    .module('conemoApp.services')
    .service(
      'Lessons',
      ['$rootScope', 'Constants', 'Resources', '$window', Lessons]
    );
})();
