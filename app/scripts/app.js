/*jslint node: true */
'use strict';
var PurpleRobotClient = new PurpleRobot();
PurpleRobot.setEnvironment('production');
//set user's Purple Robot Id to the CONEMO project
PurpleRobotClient.setUserId('CONEMO').execute();

//configure internationalization defaults
if (typeof localStorage.l10n === 'undefined' || localStorage.l10n === 'undefined') {
    var l10n = 'pt-BR'; //options are en | pt-BR | es-PE 
    localStorage.config = JSON.stringify({ l10n: l10n });
} else {
    var l10n = localStorage.l10n;
}
var l10nStrings = i18nStrings.filterLocale(l10n)[0];


l10nStrings.availableLocales = _.pluck(i18nStrings.generalContent, 'l10n');

//set up intervention start date
if (typeof localStorage.startDate === 'undefined') {
    //could replace later with server side start date
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    localStorage.startDate = startDate;

} else {
    var startDate = new Date(localStorage.startDate);
    var startDateLog = {
        user_id: localStorage.userId,
        date_created: new Date(),
        start_date: startDate,
        l10n: localStorage.l10n
    };

    PurpleRobotClient.emitReading('start_date', startDateLog).execute();
}

var lessonsRead = [];
//set up lesson read cache
if (typeof localStorage.lessonsRead === 'undefined') {
    //could replace later with server side start date
    localStorage.lessonsRead = JSON.stringify([]);
}

angular.module('conemoAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/lesson/:id', {
                templateUrl: 'views/lesson.html',
                controller: 'LessonCtrl'
            })
            .when('/toolbox', {
                templateUrl: 'views/toolbox.html',
                controller: 'ToolboxCtrl'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl'
            })
            .when('/contact/:type', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl'
            })
            .when('/instructions', {
                templateUrl: 'views/instructions.html',
                controller: 'InstructionsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope) {
        $rootScope.unreadLabel = l10nStrings.unreadLabel;
        $rootScope.checkLessonRead = function(lessonID) {
            lessonsRead = JSON.parse(localStorage["lessonsRead"]);
            if (lessonsRead.indexOf(lessonID) !== -1) {
                return true;
            };
        };
    })
    .run(function($rootScope, LessonService) {
        LessonService.get(function(data) {
            $rootScope.lessons  = _.where(data.lessons, {
            l10n: l10n
            });
        });
    })
    .run(function($rootScope) {
        $rootScope.downloader = new Downloader();
        $rootScope.downloader.getFileSystem();
        $rootScope.downloader.download_links = [
            "https://github.com/cbitstech/conemo_videos/blob/master/LM1.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/LM2.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/LM3.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/LM4.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP1.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP2.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP3.mp4",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP4.mp4"
        ];
    })
