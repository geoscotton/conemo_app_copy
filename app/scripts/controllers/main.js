
'use strict';

angular.module('conemoAppApp')

.controller('MainCtrl', function ($scope, conemoConfig, $rootScope, $route, startDateService) {

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

    //set up intervention start date
    $scope.setStartDate = startDateService.setStartDate;

    $scope.availableLocales = l10nStrings.availableLocales;

    $scope.setLocale = function() {
        l10n, localStorage.l10n = this.locale;
        conemoConfig.set({ l10n: this.locale });
    };

    var daysInTreatment = startDateService.getDaysInTreatment();
    

    //Sort lessons and dialogues by date to determine first lesson and schedule triggers
    var dateSortedLessons = _.sortBy($rootScope.lessons,'dayInTreatment');
    var dateSortedDialogues = _.sortBy($rootScope.dialogues,'dayInTreatment');



    var dateToday = new Date();
    if (typeof localStorage.userId !== 'undefined') {
        // PurpleRobotClient.clearTriggers();
        $scope.setStartDate();
        schedulePRTriggersLessons();
        schedulePRTriggersDialogues();
    }
    function schedulePRTriggersLessons() {
        if (typeof localStorage.lessonTriggersScheduled === 'undefined' || localStorage.lessonTriggersScheduled === 'undefined'){
            var lessonReleases = [];
            var dateFormat = "YYYYMMDDTHHmmss";
            // skip first lesson
            for (var i = 1; i < dateSortedLessons.length; i++) {
                var lesson = {
                    releaseDay: (moment().add('d',(dateSortedLessons[i].dayInTreatment)-1)),
                    title: dateSortedLessons[i].title
                };
                
                lessonReleases.push(lesson);
            }
            _.each(lessonReleases,function(el) {
                // var triggerStart = moment(el.releaseDay).format(dateFormat);

                var triggerStart = moment(el.releaseDay).hour(8).minute(0).second(0).format(dateFormat);
                var triggerEnd = moment(triggerStart,dateFormat).add('minutes',1).format(dateFormat);

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz").showScriptNotification({
                        title: "CONEMO: ",
                        message: el.title,
                        isPersistent: true,
                        isSticky: true,
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
    };
    function schedulePRTriggersDialogues() {
        if (typeof localStorage.dialogueTriggersScheduled === 'undefined' || localStorage.dialogueTriggersScheduled === 'undefined'){
            var dialogueReleases = [];
            var dateFormat = "YYYYMMDDTHHmmss";
            for (var i = 0; i < dateSortedDialogues.length; i++) {
                var dialogue = {
                    releaseDay: (moment().add('d',(dateSortedDialogues[i].dayInTreatment)-1)),
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
                // var triggerStart = moment(el.releaseDay).format(dateFormat);

                var triggerStart = moment(el.releaseDay).hour(8).minute(1).second(0).format(dateFormat);
                var triggerEnd = moment(triggerStart,dateFormat).add('minutes',1).format(dateFormat);

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz").showNativeDialog({
                        title: "CONEMO: ",
                        message: el.message,
                        buttonLabelA: el.no_button,
                        scriptA: PurpleRobotClient.showNativeDialog({
                                        title: "CONEMO: ",
                                        message: el.no_text,
                                        buttonLabelA: "OK",
                                        scriptA: PurpleRobotClient.emitReading("dialogue_data", {
                                            user_id: localStorage.userId,
                                            dialogue_guid: el.guid,
                                            days_in_treatment: el.days_in_treatment,
                                            answer: l10nStrings.no
                                        }),
                                        buttonLabelB: "",
                                        scriptB: PurpleRobotClient.doNothing(),
                                        tag: "",
                                        priority: 1
                                    }),
                        buttonLabelB: el.yes_button,
                        scriptB: PurpleRobotClient.showNativeDialog({
                                        title: "CONEMO: ",
                                        message: el.yes_text,
                                        buttonLabelA: "OK",
                                        scriptA: PurpleRobotClient.emitReading("dialogue_data", {
                                            user_id: localStorage.userId,
                                            dialogue_guid: el.guid,
                                            days_in_treatment: el.days_in_treatment,
                                            answer: l10nStrings.yes
                                        }),
                                        buttonLabelB: "",
                                        scriptB: PurpleRobotClient.doNothing(),
                                        tag: "",
                                        priority: 1
                                    }),
                        tag: "CONEMO DIALOGUE",
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

    $scope.setUserAccountInfo = function(){
        
        localStorage.userId = this.userId;
        window.location.reload();
    }

    $scope.enableStep = function(step) {
        $("#"+step).removeClass("hidden");
    };

    $scope.isDownloading = function() {
        if (angular.element('#progressContainer').css('display') === 'none') {
            return true;
        }
        else {
            return false;
        }
    }

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

    

    $scope.filesDownloaded = typeof localStorage.lastDownload;
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
    $scope.currentLessonGuid = mostRecentLesson.guid;
    $scope.downloadLabel = l10nStrings.download;
    $scope.downloadComplete = l10nStrings.downloaderText.textDownloadComplete;
  });

