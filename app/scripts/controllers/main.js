
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

    (function schedulePRTriggersLessons() {
        if (typeof localStorage.lessonTriggersScheduled === 'undefined' || localStorage.lessonTriggersScheduled === 'undefined'){
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

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz").showScriptNotification({
                        title: "CONEMO LESSON:",
                        message: el.title,
                        isPersistent: true,
                        isSticky: false,
                        script: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo')
                      }),
                    triggerId: "LESSON"+triggerStart,
                    startAt: triggerStart,
                    endAt: triggerEnd,
                    repeatRule: "FREQ=DAILY;COUNT=1"
                }).execute();
            });
        }
            localStorage.setItem("lessonTriggersScheduled", moment().toDate());
    })();
    $scope.schedulePRTriggersDialogues = function() {
        if (typeof localStorage.dialogueTriggersScheduled === 'undefined' || localStorage.dialogueTriggersScheduled === 'undefined'){
            var dateSortedDialogues = _.sortBy($rootScope.dialogues,'dayInTreatment');
        
            var dialogueReleases = [];
            var dateFormat = "YYYYMMDDTHHmmss";

            for (var i = 0; i < dateSortedDialogues.length; i++) {
                var dialogue = {
                    releaseDay: (moment().add('d',dateSortedDialogues[i].dayInTreatment)),
                    days_in_treatment: daysInTreatment,
                    guid: dateSortedDialogues[i].guid,
                    message: dateSortedDialogues[i].message,
                    yes_text: dateSortedDialogues[i].yes_text,
                    no_text: dateSortedDialogues[i].no_text,
                    yes_button: l10nStrings.yes,
                    no_button: l10nStrings.no
                };
                
                dialogueReleases.push(dialogue);
            }
            _.each(dialogueReleases,function(el) {

                var triggerStart = moment(el.releaseDay).hour(8).minute(0).second(0).format(dateFormat);
                var triggerEnd = moment(triggerStart,dateFormat).add('minutes',1).format(dateFormat);

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz").showNativeDialog({
                        title: "CONEMO: ",
                        message: el.message,
                        buttonLabelA: el.no_button,
                        scriptA: PurpleRobotClient.emitToast(el.no_text)
                                    .emitReading("dialogue_data", {
                                        user_id: localStorage.userId,
                                        dialogue_guid: el.guid,
                                        days_in_treatment: el.days_in_treatment,
                                        answer: l10nStrings.no
                                    }),
                        buttonLabelB: el.yes_button,
                        scriptB: PurpleRobotClient.emitToast(el.yes_text)
                                    .emitReading("dialogue_data", {
                                        dialogue_guid: el.guid,
                                        user_id: el.userId,
                                        days_in_treatment: el.days_in_treatment,
                                        answer: l10nStrings.yes
                                    }),
                        priority: 1
                      }),
                    triggerId: "DIALOGUE"+triggerStart,
                    startAt: triggerStart,
                    endAt: triggerEnd,
                    repeatRule: "FREQ=DAILY;COUNT=1"
                }).execute();
            });
        }
            localStorage.setItem("dialogueTriggersScheduled", moment().toDate());
    };

    $scope.setUserAccountInfoAndDialogues = function(){
        
        localStorage.userId = this.userId;

        $scope.schedulePRTriggersDialogues();
        window.location.reload();
    }


    //Set page view vars
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
    $scope.currentLessonGuid = mostRecentLesson.guid;
    $scope.downloadLabel = l10nStrings.download;
    $scope.downloadComplete = l10nStrings.downloaderText.textDownloadComplete;

  });

