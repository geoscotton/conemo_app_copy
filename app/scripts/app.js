function PurpleRobot() {
  this.emitReading = function() {
    return this;
  };

  this.execute = function() {
  };
}
PurpleRobot();
/* REPLACE */ var l10n = 'pt-BR'; /* REPLACE */

var l10nStrings = i18nStrings.filterLocale(l10n)[0];
var lessonsRead = [];

(function() {
  'use strict';

  localStorage.l10n = l10n;

  l10nStrings.availableLocales = _.pluck(i18nStrings.generalContent, 'l10n');

  //set up lesson read cache
  if (typeof localStorage.lessonsRead === 'undefined') {
    //could replace later with server side start date
    localStorage.lessonsRead = JSON.stringify([]);
  }

  var cacheWorker = new Worker('scripts/CacheWorker.js');

  angular.module('conemoApp.constants', []);
  angular.module('conemoApp.directives', ['conemoApp.services']);
  angular.module('conemoApp.services', [])
    .constant('Authorize', ['$location', function Authorize($location) {
      return new Promise(function(resolve, reject) {
        cacheWorker.onmessage = function onWorkerMessage(event) {
          if (event.data.status === 'authenticated') {
            resolve();
          } else {
            reject();
            $location.path('/configuration');
          }
        };
      });
    }]);
  angular.module('conemoAppApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'tmh.dynamicLocale',
    'conemoApp.constants',
    'conemoApp.directives'
  ])
    .constant('l10n', l10n)
    .config(['$routeProvider', 'Authorize', function ($routeProvider, Authorize) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'configuration',
          resolve: { authorize: Authorize }
        })
        .when('/configuration', {
          templateUrl: 'views/configuration.html',
          controller: 'ConfigurationController',
          controllerAs: 'configuration'
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
      }])
      .run(function($rootScope) {
        $rootScope.unreadLabel = l10nStrings.unreadLabel;
        $rootScope.checkLessonRead = function(lessonID) {
          lessonsRead = JSON.parse(localStorage['lessonsRead']);
          if (lessonsRead.indexOf(lessonID) !== -1) {
            return true;
          }
        };
      })
      .run(function($rootScope, LessonService) {
        LessonService.get(function(data) {
          $rootScope.lessons = _.where(data.lessons, {
            l10n: l10n
          });
        });
      })
      .run(function($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function() {
          if (l10n === 'es-PE') {
            $('body').addClass('es-PE');
          }
          else {
            $('body').removeClass('es-PE');
          }
        });
      })
      .run(function($window) {
          document.addEventListener('deviceready', onDeviceReady, false);
          document.addEventListener('resume',onResume,false);

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
              $window.location.href = '';
            } else {
              var pageToGoto = localStorage['onResume'];
              localStorage['onResume'] = '';
              $window.location.href = pageToGoto;
            }
          }
      })
      .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider
          .localeLocationPattern('scripts/vendor/angular-locale_{{locale}}.js');
      })
      .run(function(tmhDynamicLocale) {
        tmhDynamicLocale.set(localStorage.l10n);
      })
      .run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.$on('authentication_token_created', function(event, authenticationToken) {
          cacheWorker.postMessage({
            resource: 'AuthenticationTokens',
            method: 'persist',
            argument: { value: authenticationToken }
          });
          $location.path('/');
          $rootScope.$digest();
        });
      }]);

  angular.element(document).on('deviceready', function() {
    angular.bootstrap(document, ['conemoAppApp']);
  });
})();
