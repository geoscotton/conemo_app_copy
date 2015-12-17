(function() {
  'use strict';

  function MainController($window, $scope, $rootScope, $http, $route,
                          startDateService, Constants) {
    var PurpleRobotClient = new $window.PurpleRobot();

    //check to see if the user has been created on app load
    if (typeof localStorage.userId === 'undefined' || localStorage.userId === 'undefined'){
      //check that Purple Robot has been properly set up
      var verifyPurpleRobotExists = function () {
        var responsePromise = $http.get('http://localhost:12345/json/submit');
        responsePromise.success(function () {
          $('body').prepend('<div id="confirm" style="background-color: green;">' +
                            'Purple Robot properly started.</div>');
          $('#confirm').fadeOut(2000);
        });
        responsePromise.error(function () {
          $('body').html('');
          $('body').prepend('<div id="confirm" style="background-color: red;">' +
                            'Purple Robot was not properly started, please start Purple Robot.' +
                            '</div>');
        });
      };
      verifyPurpleRobotExists();


      //set user's Purple Robot Id to the CONEMO project
      PurpleRobotClient.setUserId('CONEMO')
                       .updateConfig({
                          config_enable_data_server: true,
                          config_restrict_data_wifi: false
                       })
                       .execute({
                          done: function() {
                            $('body').prepend('<div id="confirm" style="background-color: ' +
                                              'green;">User ID set</div>');
                            $('#confirm').fadeOut(2000);
                          }
                       });
      $scope.showAccountSetup = true;
      $scope.showHomeScreen = false;
    }
    else{

        $scope.userId = localStorage.userId;
        $scope.showAccountSetup = false;
        $scope.showHomeScreen = false;
        //trigger login to site logging
        var loginLog = {
          user_id: localStorage.userId,
          date_created: new Date(),
          l10n: localStorage.l10n
        };

        (new PurpleRobot()).emitReading('app_login', loginLog).execute();
    }

    //set up intervention start date
    $scope.setStartDate = startDateService.setStartDate;

    $scope.availableLocales = l10nStrings.availableLocales;

    $scope.setLocale = function() {
        l10n, localStorage.l10n = this.locale;
    };

    var daysInTreatment = startDateService.getDaysInTreatment();
    
    //Sort lessons by date to determine first lesson and schedule triggers
    var dateSortedLessons = _.sortBy($rootScope.lessons,'dayInTreatment');

    function lessonNotificationsAttrs() {
      var lessonTime = Constants.LESSON_RELEASE_TRIGGER_TIME;

      return dateSortedLessons
             .slice(1)
             .map(function notificationAttrs(lesson, index) {
               return {
                 id: index,
                 title: 'CONEMO',
                 text: lesson.title,
                 at: (moment().add('d', lesson.dayInTreatment - 1))
                     .hour(lessonTime.hour)
                     .minute(lessonTime.minute)
                     .second(lessonTime.second)
                     .toDate()
               };
             });
    }

    function scheduleLessonNotifications() {
      var firstNotificationId = 0;

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
    if (typeof localStorage.userId !== 'undefined') {
        $scope.setStartDate();
        scheduleLessonNotifications();
    }

    $scope.setUserAccountInfo = function(){
        
        localStorage.userId = this.userId;
        window.location.reload();
    }

    $scope.enableStep = function(step) {
        $('#'+step).removeClass('hidden');
    };

    var getRecentLesson = function(daysInTreatment,dateSortedLessons){

        var mostRecentLesson = {}; 
        var daysInTreatment = startDateService.getDaysInTreatment();

        _.each(dateSortedLessons,function(el,idx){
            if (el.dayInTreatment <= daysInTreatment){
                mostRecentLesson = el;
                mostRecentLesson.currentSessionIndex = idx+1;
            }

        })

        return mostRecentLesson
    }

    var mostRecentLesson = getRecentLesson(daysInTreatment,dateSortedLessons);

    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
    $scope.currentLessonGuid = mostRecentLesson.guid;
    $scope.timestamp = (new Date()).valueOf();
  }

  angular
    .module('conemoAppApp')
    .controller('MainCtrl',
                ['$window', '$scope', '$rootScope', '$http', '$route',
                 'startDateService', 'Constants', MainController]);
})();
