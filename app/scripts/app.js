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

  angular.module('conemoApp.constants', []);
  angular.module('conemoApp.directives', ['conemoApp.services']);
  angular.module('conemoApp.services', [])
  angular.module('conemoApp.controllers', ['conemoApp.constants'])
    .constant('Authorize', ['$location', 'Resources', function Authorize($location, Resources) {
      return Resources.authenticate().catch(function() {
        $location.path('/configuration');
      });
    }]);
  angular.module('conemoAppApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'tmh.dynamicLocale',
    'conemoApp.constants',
    'conemoApp.directives',
    'conemoApp.controllers'
  ])
    .constant('l10n', l10n)
    .config(['$routeProvider', 'Authorize', function ($routeProvider, Authorize) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          resolve: { authorize: Authorize }
        })
        .when('/configuration', {
          templateUrl: 'views/configuration.html',
          controller: 'ConfigurationController',
          controllerAs: 'configuration'
        })
        .when('/lesson/:id', {
          templateUrl: 'views/lesson.html',
          controller: 'LessonController'
        })
        .when('/toolbox', {
          templateUrl: 'views/toolbox.html',
          controller: 'ToolboxCtrl'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .when('/contact/:type', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .when('/instructions', {
          templateUrl: 'views/instructions.html',
          controller: 'InstructionsController',
          controllerAs: 'instructions'
        })
        .when('/instructions/:key', {
          templateUrl: 'views/instructions.html',
          controller: 'InstructionsController',
          controllerAs: 'instructions'
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
      .run(function($window, $route, Resources) {
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

          localStorage.setItem('connection', states[networkState]);

          $window.cordova.plugins.backgroundMode.setDefaults({
            title: 'CONEMO',
            ticker: 'CONEMO',
            text: ''
          });
          $window.cordova.plugins.backgroundMode.enable();
        }

        function onResume() {
          Resources.save(Resources.NAMES.Logins, {
            logged_in_at: new Date(),
            app_version: $window.Conemo.Globals.VERSION
          });

          if ($window.localStorage.onResume != null) {
            var pageToGoto = $window.localStorage.onResume;
            $window.localStorage.onResume = '';
            $window.location.href = pageToGoto;
          }

          $route.reload();
        }

        document.addEventListener('deviceready', onDeviceReady, false);
        document.addEventListener('resume',onResume,false);
      })
      .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider
          .localeLocationPattern('scripts/vendor/angular-locale_{{locale}}.js');
      })
      .run(function(tmhDynamicLocale) {
        tmhDynamicLocale.set(localStorage.l10n);
      })
      .run([
        '$rootScope', '$location', '$window', 'Constants', 'Resources',
        function($rootScope, $location, $window, Constants, Resources) {
          $rootScope.$on('authentication_token_created', function(event, authenticationToken) {
            Resources.save(Resources.NAMES.AuthenticationTokens, {
              value: authenticationToken
            });
            Resources.save(Resources.NAMES.Devices, {
              device_uuid: $window.device.uuid || Constants.DEFAULT_CLIENT_UUID,
              manufacturer: $window.device.manufacturer,
              model: $window.device.model,
              platform: $window.device.platform,
              device_version: $window.device.version
            });
            Resources.save(Resources.NAMES.ParticipantStartDates, {
              date: $window.moment().format('YYYY-MM-DD')
            });
            $location.path('/');
            $rootScope.$digest();
          });
        }
      ]);

  angular.element(document).on('deviceready', function() {
    angular.bootstrap(document, ['conemoAppApp']);
  });
})();
