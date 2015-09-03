
'use strict';

angular.module('conemoAppApp')

.controller('MainCtrl', function ($scope, conemoConfig, $rootScope, $http,
                                  $route, startDateService, Constants) {

    //check to see if the user has been created on app load
    if (typeof localStorage.userId === 'undefined' || localStorage.userId === 'undefined'){

    //check that Purple Robot has been properly set up
      var verifyPurpleRobotExists = function () {
        var responsePromise = $http.get('http://localhost:12345/json/submit');
        responsePromise.success(function (data, status, headers, config) {
          $('body').prepend('<div id=\'confirm\' style=\'background-color: green;\'>Purple Robot properly started.</div>');
          $('#confirm').fadeOut(2000);
        });
        responsePromise.error(function (data, status, headers, config) {
          $('body').html('');
          $('body').prepend('<div id=\'confirm\' style=\'background-color: red;\'>Purple Robot was not properly started, please start Purple Robot.</div>');
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
                                $('body').prepend("<div id='confirm' style='background-color: green;'>User ID set</div>");
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
        conemoConfig.set({ l10n: this.locale });
    };

    var daysInTreatment = startDateService.getDaysInTreatment();
    
    //Sort lessons and dialogues by date to determine first lesson and schedule triggers
    var dateSortedLessons = _.sortBy($rootScope.lessons,'dayInTreatment');
    var dateSortedDialogues = _.sortBy($rootScope.dialogues,'dayInTreatment');

    var dateToday = new Date();
    if (typeof localStorage.userId !== 'undefined') {
        $scope.setStartDate();
        schedulePRTriggersLessons();
        schedulePRTriggersDialogues();
    }
    function schedulePRTriggersLessons() {
        if (typeof localStorage.lessonTriggersScheduled === 'undefined' || localStorage.lessonTriggersScheduled === 'undefined'){
            var lessonReleases = [];
            // skip first lesson
            for (var i = 1; i < dateSortedLessons.length; i++) {
                var lesson = {
                    releaseDay: (moment().add('d',(dateSortedLessons[i].dayInTreatment)-1)),
                    title: dateSortedLessons[i].title
                };
                
                lessonReleases.push(lesson);
            }
            var lessonCount = 0;
            _.each(lessonReleases,function(el,idx) {
              var lessonTime = Constants.LESSON_RELEASE_TRIGGER_TIME,
                  triggerStart = moment(el.releaseDay)
                                 .hour(lessonTime.hour)
                                 .minute(lessonTime.minute)
                                 .second(lessonTime.second)
                                 .toDate(),
                  triggerEnd = moment(triggerStart).add('minutes', 1).toDate();

              PurpleRobotClient.updateTrigger({
                  script: PurpleRobotClient.vibrate("buzz").showScriptNotification({
                      title: "CONEMO: ",
                      message: el.title,
                      isPersistent: true,
                      isSticky: false,
                      script: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo')
                    }),
                  triggerId: "LESSON"+idx,
                  startAt: triggerStart,
                  endAt: triggerEnd,
                  repeatRule: "FREQ=DAILY;COUNT=1",
                  fire_on_boot: true
              }).execute({
                  done: function() {
                      lessonCount++;
                      if (lessonCount === lessonReleases.length) {
                          $('body').prepend("<div id='confirm-lessons' style='background-color: green;'>Lessons set</div>");
                      }
                      setTimeout(function(){
                          $('#confirm-lessons').fadeOut("slow");
                      },2000);
                  }
              });
            });
        }
        localStorage.setItem("lessonTriggersScheduled", moment().toDate());
    };
    function schedulePRTriggersDialogues() {
        if (typeof localStorage.dialogueTriggersScheduled === 'undefined' || localStorage.dialogueTriggersScheduled === 'undefined'){
            var dialogueReleases = [];

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

            var dialogueCount = 0;
            _.each(dialogueReleases,function(el,idx) {
                var dialogueTime = Constants.DIALOGUE_RELEASE_TRIGGER_TIME,
                    triggerStart = moment(el.releaseDay)
                                   .hour(dialogueTime.hour)
                                   .minute(dialogueTime.minute)
                                   .second(dialogueTime.second)
                                   .toDate(),
                    triggerEnd = moment(triggerStart).add('minutes', 1).toDate();

                PurpleRobotClient.updateTrigger({
                    script: PurpleRobotClient.vibrate("buzz").showNativeDialog({
                        title: "CONEMO: ",
                        message: el.message,
                        buttonLabelA: el.no_button,
                        scriptA: PurpleRobotClient.disableTrigger("DIALOGUE"+idx).showNativeDialog({
                                        title: "CONEMO: ",
                                        message: el.no_text,
                                        buttonLabelA: "OK",
                                        scriptA: PurpleRobotClient.disableTrigger("DIALOGUE"+idx).emitReading("dialogue_data", {
                                            user_id: localStorage.userId,
                                            dialogue_guid: el.guid,
                                            days_in_treatment: el.days_in_treatment,
                                            answer: l10nStrings.no
                                        }),
                                        buttonLabelB: "",
                                        scriptB: PurpleRobotClient.disableTrigger("DIALOGUE"+idx).disableTrigger("DIALOGUE"+idx),
                                        tag: "",
                                        priority: 1
                                    }),
                        buttonLabelB: el.yes_button,
                        scriptB: PurpleRobotClient.disableTrigger("DIALOGUE"+idx).showNativeDialog({
                                        title: "CONEMO: ",
                                        message: el.yes_text,
                                        buttonLabelA: "OK",
                                        scriptA: PurpleRobotClient.disableTrigger("DIALOGUE"+idx).emitReading("dialogue_data", {
                                            user_id: localStorage.userId,
                                            dialogue_guid: el.guid,
                                            days_in_treatment: el.days_in_treatment,
                                            answer: l10nStrings.yes
                                        }),
                                        buttonLabelB: "",
                                        scriptB: PurpleRobotClient.disableTrigger("DIALOGUE"+idx),
                                        tag: "",
                                        priority: 1
                                    }),
                        tag: "CONEMO DIALOGUE",
                        priority: 1
                      }),
                    triggerId: "DIALOGUE"+idx,
                    startAt: triggerStart,
                    endAt: triggerEnd,
                    repeatRule: "FREQ=MINUTELY;INTERVAL=15",
                    fire_on_boot: true
                }).execute({
                    done: function() {
                        dialogueCount++;
                        if (dialogueCount === dialogueReleases.length) {
                            $('body').prepend("<div id='confirm-dialogues' style='background-color: green;'>Dialogues set</div>");
                        }
                        setTimeout(function(){
                            $('#confirm-dialogues').fadeOut("slow");
                        },2000);
                    }
                });
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
