$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};
var cbits = {};
cbits.getDaysInTreatment = function () {
  //Get current time zeroed date for comparison with start
  var dateToday = new Date();
  dateToday.setHours(0, 0, 0, 0);
  var dateDiff = function (dateEarlier, dateLater) {
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.round((dateLater.getTime() - dateEarlier.getTime()) / oneDay);
  };
  return dateDiff(startDate, dateToday) + 1;
};
'use strict';
var i18nStrings = {};
i18nStrings.defaultI10n = 'pt-BR';
i18nStrings.filterLocale = function (locale) {
  var selectLocale = locale || i18nStrings.defaultI10n;
  return _.where(i18nStrings.generalContent, { l10n: selectLocale });
};
i18nStrings.generalContent = [];
i18nStrings.generalContent.push({
  l10n: 'en',
  language: 'English',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December'
  ],
  appName: 'CONEMO',
  beginLessonButtonLabel: 'Begin',
  toolBoxLabel: 'Toolbox',
  backLabel: 'Back',
  nextLabel: 'Next',
  configureUserLabel: 'Configure Your User Account',
  contactHelpLabel: 'Contact Study Staff',
  instructionsLabel: 'Instructions',
  instructionsContent: 'stuff',
  contactTypes: [
    'I need help with the app',
    'I need general assistance from my nurse',
    'I am having issues with connectivity'
  ],
  thankYouAlert: 'Thank you, the study staff have been contacted.',
  unreadLabel: 'unread'
});
i18nStrings.generalContent.push({
  l10n: 'pt-BR',
  language: 'Portugu\xeas',
  months: [
    'Janeiro',
    'Fevereiro',
    'Mar\xe7o',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Septembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  appName: 'CONEMO',
  beginLessonButtonLabel: 'Iniciar',
  toolBoxLabel: 'Caixa de Ferramentas',
  backLabel: 'Anterior',
  nextLabel: 'Pr\xf3ximo',
  configureUserLabel: 'Configure sua Conta de Usu\xe1rio',
  contactHelpLabel: 'Equipe do Estudo Contato',
  instructionsLabel: 'Instru\xe7\xf5es',
  instructionsContent: '<h2><i class=\'glyphicon glyphicon-question-sign\'></i> Como funciona o App:</h2><ol class=\'well\'><li>3 vezes por semana voc\xea dever\xe1 fazer o login no aplicativo CONEMO, haver\xe1 novas ferramentas e informa\xe7\xf5es cada vez que voc\xea acess\xe1-lo</li><li>Cada vez que voc\xea fizer seu login, voc\xea ir\xe1 aprender algumas estrat\xe9gias testadas que s\xe3o desenvolvidas para mant\xea-lo mais saud\xe1vel e feliz</li><li>Se voc\xea esquecer de acessar o aplicativo por mais de duas vezes, voc\xea ser\xe1 contactado por seu auxiliar de enfermagem para ter certeza de que voc\xea continue acessando e participando do programa</li></ol><h2><i class=\'glyphicon glyphicon-wrench\'></i> Caixa de ferramentas</h2><ol class=\'well\'><li>Voc\xea pode voltar para ferramentas mais antigas (dos dias anteriores), se voc\xea quiser, visitando a caixa de ferramentas</li><li>Se voc\xea pular ferramentas ou perd\xea-las, voc\xea pode visitar a caixa de ferramentas para voltar a elas</li></ol> <h2><i class=\'glyphicon glyphicon-phone\'></i> Solicita\xe7\xe3o de Ajuda</h2> <ol class=\'well\'><li>Se precisar de ajuda a qualquer momento, pressione o bot\xe3o de Solicita\xe7\xe3o de ajuda.</li><li>N\xe3o se preocupe, voc\xea pode pedir ajuda <ol><li>com o aplicativo</li><li>para uma auxiliar de enfermagem com o seu telefone</li></ol>',
  contactTypes: [
    'Preciso de ajuda com o aplicativo',
    'Preciso de assist\xeancia geral da minha Auxiliar de Enfermagem',
    'Estou com problemas em conectar a internet'
  ],
  thankYouAlert: 'Obrigado, a equipe do estudo foram contactados',
  unreadLabel: 'n\xe3o lido'
});
i18nStrings.generalContent.push({
  l10n: 'es-PE',
  language: 'Espa\xf1ol',
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  appName: 'CONEMO',
  beginLessonButtonLabel: 'Inicio',
  toolBoxLabel: 'Sesiones',
  backLabel: 'Anterior',
  nextLabel: 'Siguiente',
  configureUserLabel: 'Configurar cuenta',
  contactHelpLabel: 'Solicitar ayuda',
  instructionsLabel: 'Instrucciones',
  instructionsContent: '<h2><i class=\'glyphicon glyphicon-question-sign\'></i> \xbfC\xf3mo funciona el aplicativo?</h2><ol class=\'well\'><li>Debes ingresar al aplicativo CONEMO 3 veces a la semana. Cada vez que lo hagas, el aplicativo te dar\xe1 nueva informaci\xf3n y nuevas tareas.</li><li>Cada vez que uses el aplicativo, aprender\xe1s nuevas estrategias para mantenerte sano y feliz.</li><li>Si olvidas ingresar al aplicativo m\xe1s de 2 veces seguidas, una enfermera te llamar\xe1 para saber si todo est\xe1 bien e invitarte a seguir usando CONEMO.</li></ol><h2><i class=\'glyphicon glyphicon-wrench\'></i> Sesiones</h2><ol class=\'well\'><li>Si quieres mirar una de las sesiones anteriores debes apretar el bot\xf3n \u201cSesiones\u201d y ah\xed encontrar\xe1s la sesi\xf3n que quieres usar.</li><li>Si pierdes una sesi\xf3n o no la haces a tiempo, siempre puedes recuperarla apretando el bot\xf3n \u201cSesiones\u201d.</li></ol> <h2><i class=\'glyphicon glyphicon-phone\'></i> Solicitar ayuda</h2> <ol class=\'well\'><li>Si en alg\xfan momento necesitas ayuda de la enfermera, por favor aprieta el bot\xf3n \u201cSolicitar ayuda\u201d.</li><li>Luego elige una de las siguientes alternativas: <ol><li>Necesito ayuda con el aplicativo,</li><li>Necesito ayuda de mi enfermera</li><li>Tengo dificultades con la conexi\xf3n de internet</li></ol>',
  contactTypes: [
    'Necesito ayuda con el aplicativo',
    'Necesito ayuda de mi enfermera',
    'Tengo dificultades con la conexi\xf3n de internet'
  ],
  thankYouAlert: 'Gracias. Tu mensaje ha sido enviado. Tu enfermera o enfermero te llamar\xe1 pronto.',
  unreadLabel: 'No le\xeddo'
});
/*jslint node: true */
'use strict';
var PurpleRobotClient = new PurpleRobot();
PurpleRobot.setEnvironment('production');
//set user's Purple Robot Id to the CONEMO project
PurpleRobotClient.setUserId('CONEMO').execute();
//configure internationalization defaults
if (typeof localStorage.l10n === 'undefined' || localStorage.l10n === 'undefined') {
  var l10n = 'pt-BR';
  //options are en | pt-BR | es-PE 
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
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/lesson/:id', {
      templateUrl: 'views/lesson.html',
      controller: 'LessonCtrl'
    }).when('/toolbox', {
      templateUrl: 'views/toolbox.html',
      controller: 'ToolboxCtrl'
    }).when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    }).when('/contact/:type', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    }).when('/instructions', {
      templateUrl: 'views/instructions.html',
      controller: 'InstructionsCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.unreadLabel = l10nStrings.unreadLabel;
    $rootScope.checkLessonRead = function (lessonID) {
      lessonsRead = JSON.parse(localStorage['lessonsRead']);
      if (lessonsRead.indexOf(lessonID) !== -1) {
        return true;
      }
      ;
    };
  }
]).run([
  '$rootScope',
  'LessonService',
  function ($rootScope, LessonService) {
    LessonService.get(function (data) {
      $rootScope.lessons = _.where(data.lessons, { l10n: l10n });
    });
  }
]).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.downloader = new Downloader();
    $rootScope.downloader.getFileSystem();
    $rootScope.downloader.download_links = [
      'https://github.com/cbitstech/conemo_videos/blob/master/LM1.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/LM2.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/LM3.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/LM4.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/SP1.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/SP2.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/SP3.mp4',
      'https://github.com/cbitstech/conemo_videos/blob/master/SP4.mp4'
    ];
  }
]);
'use strict';
angular.module('conemoAppApp').filter('translate', [
  '$rootScope',
  'conemoConfig',
  function ($rootScope, conemoConfig) {
    var data = null, serviceInvoked = false;
    function translate(key) {
      var t = _.find(i18nStrings.generalContent, { l10n: data.l10n });
      var today = new Date();
      var currentMonth = today.getMonth();
      if (typeof t === 'undefined') {
        return 'locale not found: ' + data.l10n;
      } else if (key === 'months') {
        return t[key][currentMonth];
      } else if (typeof t[key] === 'undefined') {
        return 'translation not found: ' + data.l10n + ' => ' + key;
      }
      return t[key];
    }
    return function (key) {
      if (data === null) {
        if (!serviceInvoked) {
          serviceInvoked = true;
          // update the translation on load
          conemoConfig.get().then(function (config) {
            data = config;
          });
          // update the translation on l10n change
          $rootScope.$on('conemoConfig:changed', function (event, config) {
            data = config;
          });
        }
        return '';
      } else {
        return translate(key);
      }
    };
  }
]).filter('reverse', function () {
  return function (items) {
    return items.slice().reverse();
  };
});
'use strict';
angular.module('conemoAppApp').factory('conemoConfig', [
  '$rootScope',
  function ($rootScope) {
    $rootScope.appVersion = '0.1.8';
    function ConemoConfig() {
    }
    ConemoConfig.prototype.get = function () {
      return $.Deferred().resolve(JSON.parse(localStorage.config));
    };
    ConemoConfig.prototype.set = function (config) {
      localStorage.config = JSON.stringify(config);
      $rootScope.$emit('conemoConfig:changed', config);
    };
    return new ConemoConfig();
  }
]).factory('LessonService', [
  '$resource',
  function ($resource) {
    return $resource('scripts/lessons.json');
  }
]);
'use strict';
angular.module('conemoAppApp').controller('MainCtrl', [
  '$scope',
  'conemoConfig',
  '$rootScope',
  '$route',
  function ($scope, conemoConfig, $rootScope, $route) {
    //check to see if the user has been created on app load
    if (typeof localStorage.userId === 'undefined' || localStorage.userId === 'undefined') {
      $scope.showAccountSetup = true;
      $scope.showHomeScreen = false;
    } else {
      $scope.userId = localStorage.userId;
      $scope.showAccountSetup = false;
      $scope.showHomeScreen = false;
      //trigger login to site logging
      var loginLog = {
          user_id: localStorage.userId,
          date_created: new Date(),
          l10n: localStorage.l10n
        };
      new PurpleRobot().emitReading('app_login', loginLog).execute();
    }
    $scope.availableLocales = l10nStrings.availableLocales;
    $scope.setLocale = function () {
      l10n, localStorage.l10n = this.locale;
      conemoConfig.set({ l10n: this.locale });
    };
    $scope.setUserAccountInfo = function () {
      localStorage.userId = this.userId;
      window.location.reload();
    };
    var daysInTreatment = cbits.getDaysInTreatment();
    //Sort lessons by date to determine first lesson
    var dateSortedLessons = _.sortBy($rootScope.lessons, 'dayInTreatment');
    var getRecentLesson = function (daysInTreatment, dateSortedLessons) {
      var mostRecentLesson = {};
      _.each(dateSortedLessons, function (el, idx) {
        if (el.dayInTreatment <= daysInTreatment) {
          mostRecentLesson = el;
          mostRecentLesson.currentSessionIndex = idx + 1;
        }
      });
      return mostRecentLesson;
    };
    var mostRecentLesson = getRecentLesson(daysInTreatment, dateSortedLessons);
    var dateToday = new Date();
    //Set page view vars
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonMonth = l10nStrings.months[dateToday.getMonth()];
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
    $scope.currentLessonGuid = mostRecentLesson.guid;
  }
]);
'use strict';
angular.module('conemoAppApp').controller('LessonCtrl', [
  '$scope',
  '$routeParams',
  '$sce',
  '$location',
  '$rootScope',
  function ($scope, $routeParams, $sce, $location, $rootScope) {
    var docHeight = $(window).height();
    var docWidth = $(window).width();
    var selectedLesson = _.where($rootScope.lessons, { guid: $routeParams.id })[0];
    var slides = _.sortBy(selectedLesson.slides, 'position');
    var buildSlideContent = function (slides) {
      var concatenatedSlides = '';
      _.each(slides, function (el, idx) {
        concatenatedSlides += '<div style="height:' + docHeight + 'px;" class="slide"  data-index="' + idx + '" data-position="' + el.position + '">' + el.content + '</div>';
      });
      var videos = $rootScope.downloader.findInstances('video', concatenatedSlides);
      concatenatedSlides = $rootScope.downloader.insert('video', concatenatedSlides, videos);
      return concatenatedSlides;
    };
    $scope.navButtonGenerator = function (slideIndex) {
      if (slides.length == 1) {
        $scope.showHome = true;
        $scope.showBack = false;
        $scope.showNext = false;
      } else if (slideIndex == slides.length - 1) {
        $scope.showHome = true;
        $scope.showBack = true;
        $scope.showNext = false;
      } else if (slideIndex == 0) {
        $scope.showHome = false;
        $scope.showBack = false;
        $scope.showNext = true;
      } else {
        $scope.showHome = false;
        $scope.showBack = true;
        $scope.showNext = true;
      }
    };
    $scope.slideNavigator = function (slidemover) {
      $scope.navButtonGenerator($scope.currentSlideIndex);
      if (typeof slidemover !== 'number') {
        switch (slidemover) {
        case 'next':
          $scope.currentSlideIndex++;
          break;
        case 'back':
          $scope.currentSlideIndex--;
          break;
        }
      }
      $scope.pageCounter = $scope.currentSlideIndex + 1 + ' / ' + slides.length;
      $('html, body').animate({ scrollTop: docHeight * $scope.currentSlideIndex + 'px' });
    };
    $scope.updatePageCounter = function () {
      $scope.currentSlideIndex = Math.round(pageYOffset / docHeight);
      $scope.pageCounter = $scope.currentSlideIndex + 1 + ' / ' + slides.length;
      $scope.navButtonGenerator($scope.currentSlideIndex);
    };
    var daysInTreatment = cbits.getDaysInTreatment();
    $scope.backLabel = l10nStrings.backLabel;
    $scope.nextLabel = l10nStrings.nextLabel;
    $scope.showSlides = false;
    $scope.slideContent = $sce.trustAsHtml(buildSlideContent(slides));
    $scope.currentSlideIndex = 0;
    $scope.slideNavigator($scope.currentSlideIndex);
    $scope.saveForm = function (path) {
      var saveContents = {
          user_id: localStorage.userId,
          lesson_guid: $routeParams.id,
          days_in_treatment: daysInTreatment,
          days_in_treatment_assigned: selectedLesson.dayInTreatment,
          date_created: new Date(),
          l10n: localStorage.l10n
        };
      saveContents.form_payload = JSON.stringify($('#slideShowForm').serializeObject());
      new PurpleRobot().emitReading('lesson_data', saveContents).execute();
      // mark lesson as read    
      if (lessonsRead.indexOf(selectedLesson.guid) === -1) {
        lessonsRead.push(selectedLesson.guid);
        localStorage.setItem('lessonsRead', JSON.stringify(lessonsRead));
      }
      ;
      $location.path(path);
      return false;
    };
  }
]).directive('scroll', [
  '$window',
  function ($window) {
    return function (scope, element, attrs) {
      angular.element($window).bind('scroll', function () {
        scope.$apply(attrs.scroll);
      });
    };
  }
]);
'use strict';
angular.module('conemoAppApp').controller('ContactCtrl', [
  '$scope',
  function ($scope) {
    $scope.contactHelpLabel = l10nStrings.contactHelpLabel;
    $scope.contactTypes = l10nStrings.contactTypes;
    $scope.thankYouAlert = l10nStrings.thankYouAlert;
    $scope.contactStaff = function () {
      var saveContents = {
          user_id: localStorage.userId,
          message: this.contactType,
          date_created: new Date(),
          l10n: localStorage.l10n
        };
      new PurpleRobot().emitReading('staff_messages', saveContents).execute();
      $scope.successAlertVisible = true;
    };
  }
]);
'use strict';
angular.module('conemoAppApp').controller('InstructionsCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    $scope.instructionsLabel = l10nStrings.instructionsLabel;
    $scope.downloadTest = function () {
      $rootScope.downloader.download();
    };
    $scope.prompt = function () {
      var PurpleRobotClient = new PurpleRobot();
      PurpleRobotClient.showNativeDialog({
        title: 'CONEMO',
        message: 'Login no aplicativo CONEMO',
        buttonLabelA: 'Sim',
        buttonLabelB: 'Noo',
        scriptA: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo'),
        scriptB: PurpleRobotClient.doNothing()
      }).execute();
    };
  }
]);
'use strict';
angular.module('conemoAppApp').controller('ToolboxCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    var dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);
    var dateDiff = function (dateEarlier, dateLater) {
      var oneDay = 1000 * 60 * 60 * 24;
      return Math.round((dateLater.getTime() - dateEarlier.getTime()) / oneDay);
    };
    var daysInTreatment = dateDiff(startDate, dateToday) + 1;
    $scope.availableLessons = _.filter($rootScope.lessons, function (el) {
      return el.dayInTreatment <= daysInTreatment;
    });
    $scope.beginLessonButtonLabel = l10nStrings.beginLessonButtonLabel;
  }
]);