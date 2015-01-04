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
  unreadLabel: 'unread',
  download: 'download',
  downloaderText: {
    textDownloadComplete: 'Download Complete!',
    textDownloading: 'Downloading',
    textFile: 'file',
    textFiles: 'files',
    textDownloadingError: 'Something went wrong with the download and a report has been sent.',
    textMissingPlugin: 'File transfer plug in is missing. Downloads may not be complete.',
    textMissingContent: 'Please download the most recent content.',
    textUnavailableMedia: '<p>This media is unavailable.</p>',
    textUnsupportedFileType: 'That file type is not currently supported.',
    textAlert: 'That file type is not currently supported.'
  },
  videoLinks: [
    'https://conemo.northwestern.edu/system/EN1.mp4',
    'https://conemo.northwestern.edu/system/EN2.mp4'
  ],
  yes: 'yes',
  no: 'no'
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
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  appName: 'CONEMO',
  beginLessonButtonLabel: 'Iniciar',
  toolBoxLabel: 'Sess\xf5es anteriores',
  backLabel: 'Anterior',
  nextLabel: 'Pr\xf3ximo',
  configureUserLabel: 'Configure sua Conta de Usu\xe1rio',
  contactHelpLabel: 'Solicita\xe7\xe3o de ajuda',
  instructionsLabel: 'Instru\xe7\xf5es',
  instructionsLesson: 'Sess\xe3o de exemplo',
  instructionsContent: '<h2><i class=\'glyphicon glyphicon-question-sign\'></i> Como funciona o App:</h2><ol class=\'well\'><li>3 vezes por semana voc\xea dever\xe1 fazer o login no aplicativo CONEMO, haver\xe1 novas ferramentas e informa\xe7\xf5es cada vez que voc\xea acess\xe1-lo</li><li>Cada vez que voc\xea fizer seu login, voc\xea ir\xe1 aprender algumas estrat\xe9gias testadas que s\xe3o desenvolvidas para mant\xea-lo mais saud\xe1vel e feliz</li><li>Se voc\xea esquecer de acessar o aplicativo por mais de duas vezes, voc\xea ser\xe1 contactado por seu auxiliar de enfermagem para ter certeza de que voc\xea continue acessando e participando do programa</li></ol><h2><i class=\'glyphicon glyphicon-wrench\'></i> Sess\xf5es anteriores</h2><ol class=\'well\'><li>Voc\xea pode voltar para sess\xf5es mais antigas (dos dias anteriores), se voc\xea quiser, visitando a caixa de ferramentas</li><li>Se voc\xea pular sess\xf5es, voc\xea pode visitar as sess\xf5es anteriores para voltar a elas</li></ol> <h2><i class=\'glyphicon glyphicon-phone\'></i> Solicita\xe7\xe3o de Ajuda</h2> <ol class=\'well\'><li>Se precisar de ajuda a qualquer momento, pressione o bot\xe3o de Solicita\xe7\xe3o de ajuda.</li><li>N\xe3o se preocupe, voc\xea pode pedir ajuda <ol><li>com o aplicativo, se voc\xea estiver com problemas com a internet, o CONEMO ou precisa de assist\xeancia geral da auxiliar de enfermagem</li><li>para uma auxiliar de enfermagem com o seu telefone</li></ol>',
  contactTypes: [
    'Preciso de ajuda com o aplicativo',
    'Preciso de assist\xeancia geral da minha Auxiliar de Enfermagem',
    'Estou com problemas em conectar a internet'
  ],
  thankYouAlert: 'Obrigado, a equipe do estudo foi contactada',
  unreadLabel: 'n\xe3o lido',
  download: 'Baixar',
  downloaderText: {
    textDownloadComplete: 'Download completo!',
    textDownloading: 'Baixando',
    textFile: 'arquivo',
    textFiles: 'arquivos',
    textDownloadingError: 'Falha no download! Uma mensagem foi enviada.',
    textMissingPlugin: 'Um plugin est\xe1 faltando. O download pode n\xe3o estar completo.',
    textMissingContent: 'Por favor, baixe os videos mais recentes em "Instru\xe7\xf5es."',
    textUnavailableMedia: '<p>Arquivo indispon\xedvel no momento</p>',
    textUnsupportedFileType: 'Este tipo de arquivo n\xe3o \xe9 compat\xedvel.',
    textAlert: 'Testing in Portugu\xeas'
  },
  videoLinks: [
    'https://conemo.northwestern.edu/system/SP1.mp4',
    'https://conemo.northwestern.edu/system/SP2.mp4',
    'https://conemo.northwestern.edu/system/SP3.mp4',
    'https://conemo.northwestern.edu/system/SP4.mp4',
    'https://conemo.northwestern.edu/system/countdown.mp4'
  ],
  yes: 'sim',
  no: 'n\xe3o'
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
  instructionsLesson: 'Sesi\xf3n de entrenamiento',
  instructionsContent: '<h2><i class=\'glyphicon glyphicon-question-sign\'></i> \xbfC\xf3mo funciona el aplicativo?</h2><ol class=\'well\'><li>Debes ingresar al aplicativo CONEMO 3 veces a la semana. Cada vez que lo hagas, el aplicativo te dar\xe1 nueva informaci\xf3n y nuevas tareas.</li><li>Cada vez que uses el aplicativo, aprender\xe1s nuevas estrategias para mantenerte sano y feliz.</li><li>Si olvidas ingresar al aplicativo m\xe1s de 2 veces seguidas, una enfermera te llamar\xe1 para saber si todo est\xe1 bien e invitarte a seguir usando CONEMO.</li></ol><h2><i class=\'glyphicon glyphicon-wrench\'></i> Sesiones</h2><ol class=\'well\'><li>Si quieres mirar una de las sesiones anteriores debes apretar el bot\xf3n \u201cSesiones\u201d y ah\xed encontrar\xe1s la sesi\xf3n que quieres usar.</li><li>Si pierdes una sesi\xf3n o no la haces a tiempo, siempre puedes recuperarla apretando el bot\xf3n \u201cSesiones\u201d.</li></ol> <h2><i class=\'glyphicon glyphicon-phone\'></i> Solicitar ayuda</h2> <ol class=\'well\'><li>Si en alg\xfan momento necesitas ayuda de la enfermera, por favor aprieta el bot\xf3n \u201cSolicitar ayuda\u201d.</li><li>Luego elige una de las siguientes alternativas: <ol><li>Necesito ayuda con el aplicativo,</li><li>Necesito ayuda de mi enfermera</li><li>Tengo dificultades con la conexi\xf3n de internet</li></ol>',
  contactTypes: [
    'Necesito ayuda con el aplicativo',
    'Necesito ayuda de mi enfermera',
    'Tengo dificultades con la conexi\xf3n de internet'
  ],
  thankYouAlert: 'Gracias. Tu mensaje ha sido enviado. Tu enfermera o enfermero te llamar\xe1 pronto.',
  unreadLabel: 'No le\xeddo',
  download: 'Descargar',
  downloaderText: {
    textDownloadComplete: 'Descarga completa!',
    textDownloading: 'Descargando',
    textFile: 'archivo',
    textFiles: 'archivos',
    textDownloadingError: 'Algo fall\xf3 con la descarga y un reporte ha sido enviado.',
    textMissingPlugin: 'Falta una aplicaci\xf3n. Puede que las descargas no se hayan completado.',
    textMissingContent: 'Por favor, descargue la versi\xf3n m\xe1s reciente de los v\xeddeos en "Instrucciones."',
    textUnavailableMedia: '<p>En este momento este archivo no est\xe1 disponible.</p>',
    textUnsupportedFileType: 'En este momento este archivo no es compatible.',
    textAlert: 'Testing in Portugu\xeas'
  },
  videoLinks: [
    'https://conemo.northwestern.edu/system/LM1.mp4',
    'https://conemo.northwestern.edu/system/LM2.mp4',
    'https://conemo.northwestern.edu/system/LM3.mp4',
    'https://conemo.northwestern.edu/system/LM4.mp4',
    'https://conemo.northwestern.edu/system/countdown.mp4'
  ],
  yes: 's\xed',
  no: 'no'
});
/*jslint node: true */
'use strict';
var PurpleRobotClient = new PurpleRobot();
PurpleRobot.setEnvironment('production');
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
    }).when('/instructions/:key', {
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
  'DialogueService',
  function ($rootScope, DialogueService) {
    DialogueService.get(function (data) {
      $rootScope.dialogues = _.where(data.dialogues, { l10n: l10n });
    });
  }
]).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.downloader = new Downloader();
    $rootScope.downloader.getFileSystem();
    $rootScope.downloader.setDownloadLinks(l10nStrings.videoLinks);
    downloaderGlobal.text = l10nStrings.downloaderText;
    // set locale variables to downloader global variables
    $rootScope.downloadVideos = function () {
      $rootScope.downloader.downloadMultiple();
    };
  }
]).run([
  '$rootScope',
  'DialogueService',
  'LessonService',
  function ($rootScope, DialogueService, LessonService) {
    $rootScope.$watch(function () {
      return localStorage.config;
    }, function () {
      var currLocale = JSON.parse(localStorage.config).l10n;
      var currLocaleStrings = i18nStrings.filterLocale(currLocale)[0];
      // set downloader settings as per locale
      downloaderGlobal.text = currLocaleStrings.downloaderText;
      var videoLinks = currLocaleStrings.videoLinks;
      $rootScope.downloader.setDownloadLinks(videoLinks);
    });
  }
]).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function () {
      if (l10n === 'es-PE') {
        $('body').addClass('es-PE');
      } else {
        $('body').removeClass('es-PE');
      }
    });
  }
]).run([
  '$window',
  function ($window) {
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('resume', onResume, false);
    function onDeviceReady() {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      localStorage.setItem('connection', states[networkState]);
    }
    function onResume() {
      debugger;
      if (localStorage['onResume'] == undefined) {
        window.location.href = '';
      } else {
        var pageToGoto = localStorage['onResume'];
        localStorage['onResume'] = '';
        window.location.href = pageToGoto;
      }
    }
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
    $rootScope.appVersion = '0.1.38';
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
]).factory('DialogueService', [
  '$resource',
  function ($resource) {
    return $resource('scripts/dialogues.json');
  }
]).service('startDateService', function () {
  this.setStartDate = function () {
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
  };
  this.getDateDiff = function (dateEarlier, dateLater) {
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.round((dateLater.getTime() - dateEarlier.getTime()) / oneDay);
  };
  this.getDaysInTreatment = function () {
    //Get current time zeroed date for comparison with start
    var dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);
    var startDate = new Date(localStorage.startDate);
    var daysInTreatment = this.getDateDiff(startDate, dateToday) + 1;
    return daysInTreatment;
  };
  this.test = function () {
    console.log('i\'m a test');
  };
});
'use strict';
angular.module('conemoAppApp').controller('MainCtrl', [
  '$scope',
  'conemoConfig',
  '$rootScope',
  '$route',
  'startDateService',
  function ($scope, conemoConfig, $rootScope, $route, startDateService) {
    //check to see if the user has been created on app load
    if (typeof localStorage.userId === 'undefined' || localStorage.userId === 'undefined') {
      //set user's Purple Robot Id to the CONEMO project
      PurpleRobotClient.setUserId('CONEMO').updateConfig({
        config_enable_data_server: true,
        config_restrict_data_wifi: false
      }).execute({
        done: function () {
          $('body').prepend('<div id=\'confirm\' style=\'background-color: green;\'>User ID set</div>');
          $('#confirm').fadeOut(2000);
        }
      });
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
    //set up intervention start date
    $scope.setStartDate = startDateService.setStartDate;
    $scope.availableLocales = l10nStrings.availableLocales;
    $scope.setLocale = function () {
      l10n, localStorage.l10n = this.locale;
      conemoConfig.set({ l10n: this.locale });
    };
    var daysInTreatment = startDateService.getDaysInTreatment();
    //Sort lessons and dialogues by date to determine first lesson and schedule triggers
    var dateSortedLessons = _.sortBy($rootScope.lessons, 'dayInTreatment');
    var dateSortedDialogues = _.sortBy($rootScope.dialogues, 'dayInTreatment');
    var dateToday = new Date();
    if (typeof localStorage.userId !== 'undefined') {
      // PurpleRobotClient.clearTriggers().execute();
      $scope.setStartDate();
      schedulePRTriggersLessons();
      schedulePRTriggersDialogues();
    }
    function schedulePRTriggersLessons() {
      if (typeof localStorage.lessonTriggersScheduled === 'undefined' || localStorage.lessonTriggersScheduled === 'undefined') {
        var lessonReleases = [];
        var dateFormatCustom = 'YYYYMMDDTHHmmss';
        // skip first lesson
        for (var i = 1; i < dateSortedLessons.length; i++) {
          var lesson = {
              releaseDay: moment().add('d', dateSortedLessons[i].dayInTreatment - 1),
              title: dateSortedLessons[i].title
            };
          lessonReleases.push(lesson);
        }
        var lessonCount = 0;
        _.each(lessonReleases, function (el) {
          // var triggerStart = moment(el.releaseDay).format(dateFormatCustom);
          var triggerStart = moment(el.releaseDay).hour(8).minute(0).second(0).format(dateFormatCustom);
          var triggerEnd = moment(triggerStart, dateFormatCustom).add('minutes', 1).format(dateFormatCustom);
          PurpleRobotClient.updateTrigger({
            script: PurpleRobotClient.vibrate('buzz').showScriptNotification({
              title: 'CONEMO: ',
              message: el.title,
              isPersistent: true,
              isSticky: false,
              script: PurpleRobotClient.launchApplication('edu.northwestern.cbits.conemo')
            }),
            triggerId: 'LESSON' + triggerStart,
            startAt: triggerStart,
            endAt: triggerEnd,
            repeatRule: 'FREQ=DAILY;COUNT=1',
            fire_on_boot: true
          }).execute({
            done: function () {
              lessonCount++;
              if (lessonCount === lessonReleases.length) {
                $('body').prepend('<div id=\'confirm-lessons\' style=\'background-color: green;\'>Lessons set</div>');
              }
              setTimeout(function () {
                $('#confirm-lessons').fadeOut('slow');
              }, 2000);
            }
          });
        });
        setTimeout(function () {
          if (lessonCount !== lessonReleases.length) {
          }
        }, 4000);
      }
      localStorage.setItem('lessonTriggersScheduled', moment().toDate());
    }
    ;
    function schedulePRTriggersDialogues() {
      if (typeof localStorage.dialogueTriggersScheduled === 'undefined' || localStorage.dialogueTriggersScheduled === 'undefined') {
        var dialogueReleases = [];
        var dateFormatCustom = 'YYYYMMDDTHHmmss';
        for (var i = 0; i < dateSortedDialogues.length; i++) {
          var dialogue = {
              releaseDay: moment().add('d', dateSortedDialogues[i].dayInTreatment - 1),
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
        _.each(dialogueReleases, function (el) {
          // var triggerStart = moment(el.releaseDay).format(dateFormatCustom);
          var triggerStart = moment(el.releaseDay).hour(8).minute(1).second(0).format(dateFormatCustom);
          var triggerEnd = moment(triggerStart, dateFormatCustom).add('minutes', 1).format(dateFormatCustom);
          PurpleRobotClient.updateTrigger({
            script: PurpleRobotClient.vibrate('buzz').showNativeDialog({
              title: 'CONEMO: ',
              message: el.message,
              buttonLabelA: el.no_button,
              scriptA: PurpleRobotClient.showNativeDialog({
                title: 'CONEMO: ',
                message: el.no_text,
                buttonLabelA: 'OK',
                scriptA: PurpleRobotClient.emitReading('dialogue_data', {
                  user_id: localStorage.userId,
                  dialogue_guid: el.guid,
                  days_in_treatment: el.days_in_treatment,
                  answer: l10nStrings.no
                }),
                buttonLabelB: '',
                scriptB: PurpleRobotClient.doNothing(),
                tag: '',
                priority: 1
              }),
              buttonLabelB: el.yes_button,
              scriptB: PurpleRobotClient.showNativeDialog({
                title: 'CONEMO: ',
                message: el.yes_text,
                buttonLabelA: 'OK',
                scriptA: PurpleRobotClient.emitReading('dialogue_data', {
                  user_id: localStorage.userId,
                  dialogue_guid: el.guid,
                  days_in_treatment: el.days_in_treatment,
                  answer: l10nStrings.yes
                }),
                buttonLabelB: '',
                scriptB: PurpleRobotClient.doNothing(),
                tag: '',
                priority: 1
              }),
              tag: 'CONEMO DIALOGUE',
              priority: 1
            }),
            triggerId: 'DIALOGUE' + triggerStart,
            startAt: triggerStart,
            endAt: triggerEnd,
            repeatRule: 'FREQ=DAILY;COUNT=1',
            fire_on_boot: true
          }).execute({
            done: function () {
              dialogueCount++;
              if (dialogueCount === dialogueReleases.length) {
                $('body').prepend('<div id=\'confirm-dialogues\' style=\'background-color: green;\'>Dialogues set</div>');
              }
              setTimeout(function () {
                $('#confirm-dialogues').fadeOut('slow');
              }, 2000);
            }
          });
        });
        setTimeout(function () {
          if (dialogueCount !== dialogueReleases.length) {
            $('body').prepend('<div id=\'error-dialogues\' style=\'background-color: red;\'>PR Error dialogues</div>');
          }
        }, 5500);
      }
      localStorage.setItem('dialogueTriggersScheduled', moment().toDate());
    }
    ;
    $scope.setUserAccountInfo = function () {
      localStorage.userId = this.userId;
      window.location.reload();
    };
    $scope.enableStep = function (step) {
      $('#' + step).removeClass('hidden');
    };
    $scope.isDownloading = function () {
      if (angular.element('#progressContainer').css('display') === 'none') {
        return true;
      } else {
        return false;
      }
    };
    var getRecentLesson = function (daysInTreatment, dateSortedLessons) {
      var mostRecentLesson = {};
      var daysInTreatment = startDateService.getDaysInTreatment();
      _.each(dateSortedLessons, function (el, idx) {
        if (el.dayInTreatment <= daysInTreatment) {
          mostRecentLesson = el;
          mostRecentLesson.currentSessionIndex = idx + 1;
        }
      });
      return mostRecentLesson;
    };
    var mostRecentLesson = getRecentLesson(daysInTreatment, dateSortedLessons);
    $scope.filesDownloaded = typeof localStorage.lastDownload;
    $scope.userId = localStorage.userId;
    $scope.currentLessonTitle = mostRecentLesson.title;
    $scope.currentLessonDay = dateToday.getDate();
    $scope.l10n = l10n;
    $scope.currentSessionIndex = mostRecentLesson.currentSessionIndex;
    $scope.currentLessonGuid = mostRecentLesson.guid;
    $scope.downloadLabel = l10nStrings.download;
    $scope.downloadComplete = l10nStrings.downloaderText.textDownloadComplete;
  }
]);
'use strict';
angular.module('conemoAppApp').controller('LessonCtrl', [
  '$scope',
  '$routeParams',
  '$sce',
  '$location',
  '$rootScope',
  'startDateService',
  function ($scope, $routeParams, $sce, $location, $rootScope, startDateService) {
    var docHeight = $(window).height();
    var docWidth = $(window).width();
    var selectedLesson = _.where($rootScope.lessons, { guid: $routeParams.id })[0];
    var slides = _.sortBy(selectedLesson.slides, 'position');
    var buildSlideContent = function (slides) {
      var concatenatedSlides = '';
      _.each(slides, function (el, idx) {
        concatenatedSlides += '<div style="height:' + docHeight + 'px;" class="slide"  data-index="' + idx + '" data-position="' + el.position + '">' + el.content + '</div>';
      });
      // var videos = $rootScope.downloader.findInstances("video",concatenatedSlides);
      concatenatedSlides = $rootScope.downloader.insert('video', concatenatedSlides);
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
      $('html, body').animate({ scrollTop: docHeight * $scope.currentSlideIndex + 'px' });
    };
    $scope.updatePageCounter = function () {
      $scope.currentSlideIndex = Math.round(pageYOffset / docHeight);
      $scope.pageCounter = $scope.currentSlideIndex + 1 + ' / ' + slides.length;
      $scope.navButtonGenerator($scope.currentSlideIndex);
    };
    var daysInTreatment = startDateService.getDaysInTreatment();
    $scope.backLabel = l10nStrings.backLabel;
    $scope.nextLabel = l10nStrings.nextLabel;
    $scope.showSlides = false;
    $scope.slideContent = $sce.trustAsHtml(buildSlideContent(slides));
    $scope.currentSlideIndex = 0;
    $scope.pageCounter = $scope.currentSlideIndex + 1 + ' / ' + slides.length;
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
]).directive('moDateInput', [
  '$window',
  function ($window) {
    return {
      require: '^ngModel',
      restrict: 'A',
      link: function (scope, elm, attrs, ctrl) {
        var moment = $window.moment;
        var dateFormat = attrs.moMediumDate;
        attrs.$observe('moDateInput', function (newValue) {
          if (dateFormat == newValue || !ctrl.$modelValue)
            return;
          dateFormat = newValue;
          ctrl.$modelValue = new Date(ctrl.$setViewValue);
        });
        ctrl.$formatters.unshift(function (modelValue) {
          scope = scope;
          if (!dateFormat || !modelValue)
            return '';
          var retVal = moment(modelValue).format(dateFormat);
          return retVal;
        });
        ctrl.$parsers.unshift(function (viewValue) {
          scope = scope;
          var date = moment(viewValue, dateFormat);
          return date && date.isValid() && date.year() > 1950 ? date.toDate() : '';
        });
      }
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
  '$routeParams',
  function ($scope, $rootScope, $routeParams) {
    localStorage['onResume'] = '';
    $scope.instructionsLabel = l10nStrings.instructionsLabel;
    $scope.$watch('checked', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        var videocontainerES = document.getElementById('samplevideo-es');
        var videocontainerPT = document.getElementById('samplevideo-pt');
        var downloader = new Downloader();
        videocontainerES.innerHTML = downloader.insert('video', videocontainerES.textContent);
        videocontainerPT.innerHTML = downloader.insert('video', videocontainerPT.textContent);
      }
    });
    $scope.checked = false;
    if ($routeParams.key == 'showSample') {
      $scope.checked = true;
      window.scrollTo(0, document.body.scrollHeight);
    }
    $scope.toggleChecked = function () {
      $scope.checked = $scope.checked === false ? true : false;
    };
    $scope.l10n = l10n;
    $scope.demoDialogue_esPE = function () {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate('buzz').showNativeDialog({
        title: 'CONEMO: ',
        message: '\xbfHas podido seguir las instrucciones de esta sesi\xf3n de entrenamiento?',
        buttonLabelA: 'No',
        scriptA: PurpleRobotClient.showNativeDialog({
          title: 'CONEMO: ',
          message: '\xa1Pregunta a tu enfermera todas tus dudas! Te ayudar\xe1 a usar el aplicativo la mejor manera posible.',
          buttonLabelA: 'OK',
          scriptA: PurpleRobotClient.doNothing(),
          buttonLabelB: '',
          scriptB: PurpleRobotClient.doNothing(),
          tag: '',
          priority: 1
        }),
        buttonLabelB: 'S\xed',
        scriptB: PurpleRobotClient.showNativeDialog({
          title: 'CONEMO: ',
          message: '\xa1Qu\xe9 bien! \xa1Empecemos!',
          buttonLabelA: 'OK',
          scriptA: PurpleRobotClient.doNothing(),
          buttonLabelB: '',
          scriptB: PurpleRobotClient.doNothing(),
          tag: '',
          priority: 1
        }),
        tag: 'CONEMO EJEMPLO',
        priority: 1
      }).execute();
    };
    $scope.demoDialogue_ptBR = function () {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate('buzz').showNativeDialog({
        title: 'CONEMO: ',
        message: 'Benvindo ao CONEMO!',
        buttonLabelA: 'N\xe3o',
        scriptA: PurpleRobotClient.doNothing(),
        buttonLabelB: 'Sim',
        scriptB: PurpleRobotClient.doNothing(),
        tag: 'CONEMO',
        priority: 1
      }).execute();
    };
    $scope.demoNotification_esPE = function () {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate('buzz').showScriptNotification({
        title: 'CONEMO: ',
        message: '\xa1Bienvenido a CONEMO!',
        isPersistent: true,
        isSticky: false,
        script: PurpleRobotClient.doNothing()
      }).execute();
    };
    $scope.demoNotification_ptBR = function () {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate('buzz').showScriptNotification({
        title: 'CONEMO: ',
        message: 'Benvindo ao CONEMO!',
        isPersistent: true,
        isSticky: false,
        script: PurpleRobotClient.doNothing()
      }).execute();
    };
  }
]);
'use strict';
angular.module('conemoAppApp').controller('ToolboxCtrl', [
  '$scope',
  '$rootScope',
  'startDateService',
  function ($scope, $rootScope, startDateService) {
    var daysInTreatment = startDateService.getDaysInTreatment();
    $scope.availableLessons = _.filter($rootScope.lessons, function (el) {
      return el.dayInTreatment <= daysInTreatment;
    });
    $scope.beginLessonButtonLabel = l10nStrings.beginLessonButtonLabel;
  }
]);