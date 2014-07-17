
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
                // prTriggerDays.push(moment().hour(8).minute(0).second(0).add('days',el).format("YYYYMMDD[T]HHmmss"));
                prTriggerDays.push(moment().hour(9).minute(2).add('minutes',el));
            })
            
            _.each(prTriggerDays,function(el) {
                var dateFormat = "YYYYMMDDTHHmmss";
                var triggerStart = moment(el).format(dateFormat);
                var triggerEnd = moment(el,"YYYYMMDDTHHmmss").add('minutes',1).format(dateFormat);
                console.log(triggerStart);
                console.log(triggerEnd);

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz"),
                    // PurpleRobotClient.showScriptNotification({
                        // title: "CONEMO",
                    //     message: "Lesson today: " + mostRecentLesson.title,
                    //     isPersistent: true,
                    //     isSticky: false,
                    //     script: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo')
                    //   }),
                    triggerId: triggerStart,
                    startAt: triggerStart,
                    endAt: triggerEnd,
                    repeatRule: "FREQ=ONCE"
                });
            });

            localStorage.setItem("triggersScheduled", moment().toDate());
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

