
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
            }
        })

        return mostRecentLesson
    }

    var mostRecentLesson = getRecentLesson(daysInTreatment,dateSortedLessons);

    var dateToday = new Date();


    //Set page view vars
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;


    $scope.currentLessonGuid = mostRecentLesson.guid;
  });

