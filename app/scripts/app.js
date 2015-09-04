    /*jslint node: true */
'use strict';
var PurpleRobotClient = new PurpleRobot();
PurpleRobot.setEnvironment('production');


//configure internationalization defaults
if (typeof localStorage.l10n === 'undefined' || localStorage.l10n === 'undefined') {
    var l10n = 'pt-BR'; //options are en | pt-BR | es-PE 
    localStorage.config = JSON.stringify({ l10n: l10n });
} else {
    var l10n = localStorage.l10n;
}
var l10nStrings = i18nStrings.filterLocale(l10n)[0];


l10nStrings.availableLocales = _.pluck(i18nStrings.generalContent, 'l10n');



var lessonsRead = [];
//set up lesson read cache
if (typeof localStorage.lessonsRead === 'undefined') {
    //could replace later with server side start date
    localStorage.lessonsRead = JSON.stringify([]);
}

angular.module('conemoApp.constants', []);
angular.module('conemoApp.directives', ['conemoApp.services']);
angular.module('conemoApp.services', []);
angular.module('conemoAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'conemoApp.constants',
    'conemoApp.directives'
])
    .constant('l10n', l10n)
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
            .when('/instructions/:key', {
                templateUrl: 'views/instructions.html',
                controller: 'InstructionsCtrl'
            })
            .when('/sample_lesson', {
                templateUrl: 'views/sample_lesson.html',
                controller: 'SampleLessonController',
                controllerAs: 'sampleLesson'
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
            })
        });
    })
    .run(function($rootScope, DialogueService) {
        DialogueService.get(function(data) {
            $rootScope.dialogues = _.where(data.dialogues, {
            l10n: l10n
            })
        });
    })
    .run(function($rootScope) {

        $rootScope.downloader = new Downloader();
        $rootScope.downloader.getFileSystem();
        $rootScope.downloader.setDownloadLinks(l10nStrings.videoLinks);

        downloaderGlobal.text = l10nStrings.downloaderText;

        
        // set locale variables to downloader global variables

        $rootScope.downloadVideos = function() {

            $rootScope.downloader.downloadMultiple();

        };

    })
    .run(function($rootScope, DialogueService, LessonService) {
        $rootScope.$watch(function() {
            return localStorage.config;
        }, function() {
            var currLocale = JSON.parse(localStorage.config).l10n;
            var currLocaleStrings = i18nStrings.filterLocale(currLocale)[0];

            // set downloader settings as per locale
            downloaderGlobal.text = currLocaleStrings.downloaderText;
            var videoLinks = currLocaleStrings.videoLinks;
            $rootScope.downloader.setDownloadLinks(videoLinks)
        });
    })
    .run(function($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function() {
            if (l10n === "es-PE") {
                $("body").addClass("es-PE");
            }
            else {
                $("body").removeClass("es-PE");
            }
        });
    })
    .run(function($window) {
        document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("resume",onResume,false);

        function onDeviceReady() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            localStorage.setItem('connection',states[networkState]);
        }
        function onResume() {
            if (localStorage['onResume'] == undefined){
            window.location.href = '';
            }
            else {
            var pageToGoto = localStorage['onResume'];
            localStorage['onResume'] = '';
            window.location.href = pageToGoto;
            }
        }
    })
    .run(function(purpleRobot) {
      purpleRobot.updateConfig({
        config_enable_log_server: true,
        config_log_server_uri: 'https://conemo-staging.cbits.northwestern.edu/debug_logs',
        config_restrict_log_wifi: false,
        config_log_heartbeat: false
      }).execute();
    });
