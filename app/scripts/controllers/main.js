
'use strict';

angular.module('conemoAppApp')

.controller('MainCtrl', function ($scope, conemoConfig, $rootScope, $route) {

    //check to see if the user has been created on app load
    if (typeof localStorage.userId === 'undefined' || localStorage.userId === 'undefined'){
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

    $scope.availableLocales = l10nStrings.availableLocales;

    $scope.setLocale = function() {
        l10n, localStorage.l10n = this.locale;
        conemoConfig.set({ l10n: this.locale });
    }

    $scope.setUserAccountInfo = function(){
        
        localStorage.userId = this.userId;

        window.location.reload();
    }


    var daysInTreatment = cbits.getDaysInTreatment();
    

    //Sort lessons by date to determine first lesson
    var dateSortedLessons = _.sortBy($rootScope.lessons,'dayInTreatment');



    var getRecentLesson = function(daysInTreatment,dateSortedLessons){

        var mostRecentLesson = {}; 

        _.each(dateSortedLessons,function(el,idx){
            if (el.dayInTreatment <= daysInTreatment){
                mostRecentLesson = el;
                mostRecentLesson.currentSessionIndex = idx+1;
                // if (el.dayInTreatment === daysInTreatment) {
                //     PRNotification(mostRecentLesson.title);
                // }
            }

        })

        return mostRecentLesson
    }

    var mostRecentLesson = getRecentLesson(daysInTreatment,dateSortedLessons);

    var dateToday = new Date();

    (function schedulePRTriggers() {
        if (typeof localStorage.triggersScheduled === 'undefined' || localStorage.triggersScheduled === 'undefined'){
            var lessonReleaseDays = [];
            var prTriggerDays = [];

            for (var i = 0; i < dateSortedLessons.length; i++) {
                lessonReleaseDays.push(dateSortedLessons[i].dayInTreatment);
            }
            _.each(lessonReleaseDays,function(el) {
                prTriggerDays.push(moment().add('days',el).toISOString());
            })
            
            _.each(prTriggerDays,function(el) {
                var triggerStart = el;
                var triggerEnd = moment(el).add('seconds',5).toISOString();

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.showScriptNotification({
                        title: "CONEMO",
                        message: "Lesson today: " + mostRecentLesson.title,
                        isPersistent: true,
                        isSticky: false,
                        script: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo')
                      }),
                    startAt: triggerStart,
                    endAt: triggerEnd,
                    repeatRule: "FREQ=ONCE"
                }).execute();
            });

            localStorage.setItem("triggersScheduled", moment().toISOString());
        }
    })();



    //Set page view vars
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;


    $scope.currentLessonGuid = mostRecentLesson.guid;
  });

