
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
            PurpleRobotClient.clearTriggers().execute();
            var lessonReleases = [];
            var dateFormat = "YYYYMMDDTHHmmss";

            // skip first lesson
            for (var i = 1; i < dateSortedLessons.length; i++) {
                var lesson = {
                    releaseDay: (moment().add('d',dateSortedLessons[i].dayInTreatment)),
                    title: dateSortedLessons[i].title
                };
                
                lessonReleases.push(lesson);
            }
            _.each(lessonReleases,function(el) {

                var triggerStart = moment(el.releaseDay).hour(8).minute(0).second(0).format(dateFormat);
                var triggerEnd = moment(triggerStart,dateFormat).add('minutes',1).format(dateFormat);
                console.log(triggerStart);

 

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz").showScriptNotification({
                        title: "CONEMO LESSON:",
                        message: el.title,
                        isPersistent: true,
                        isSticky: false,
                        script: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo')
                      }),
                    triggerId: triggerStart,
                    startAt: triggerStart,
                    endAt: triggerEnd,
                    repeatRule: "FREQ=DAILY;COUNT=1"
                }).execute();
            });
        }
            localStorage.setItem("triggersScheduled", moment().toDate());
    })();




    //Set page view vars
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;


    $scope.currentLessonGuid = mostRecentLesson.guid;
  });

