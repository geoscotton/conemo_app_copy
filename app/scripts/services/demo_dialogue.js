(function() {
  'use strict';

  function DemoDialogueFactory($filter, purpleRobot) {
    function DemoDialogue() {}

    DemoDialogue.prototype.execute = function(l10n) {
      if (l10n === 'pt-BR') {
        purpleRobot
          .vibrate('buzz')
          .showNativeDialog({
            title: 'CONEMO: ',
            message: $filter('translate')('welcomeToConemo'),
            buttonLabelA: $filter('translate')('no'),
            scriptA: purpleRobot.doNothing(),
            buttonLabelB: $filter('translate')('yes'),
            scriptB: purpleRobot.doNothing(),
            tag: 'CONEMO',
            priority: 1
          })
          .execute();
      } else if (l10n === 'es-PE') {
        purpleRobot
          .vibrate('buzz')
          .showNativeDialog({
            title: 'CONEMO: ',
            message: '¿Has podido seguir las instrucciones de esta sesión de entrenamiento?',
            buttonLabelA: $filter('translate')('no'),
            scriptA: purpleRobot.showNativeDialog({
              title: 'CONEMO: ',
              message: '¡Pregunta a tu enfermera todas tus dudas! Te ayudará a usar el ' +
                       'aplicativo la mejor manera posible.',
              buttonLabelA: 'OK',
              scriptA: purpleRobot.doNothing(),
              buttonLabelB: '',
              scriptB: purpleRobot.doNothing(),
              tag: '',
              priority: 1
            }),
            buttonLabelB: $filter('translate')('yes'),
            scriptB: purpleRobot.showNativeDialog({
              title: 'CONEMO: ',
              message: '¡Qué bien! ¡Empecemos!',
              buttonLabelA: 'OK',
              scriptA: purpleRobot.doNothing(),
              buttonLabelB: '',
              scriptB: purpleRobot.doNothing(),
              tag: '',
              priority: 1
            }),
            tag: 'CONEMO EJEMPLO',
            priority: 1
          })
          .execute();
      }
    };

    return new DemoDialogue();
  }

  angular.module('conemoAppApp')
         .factory('demoDialogue',
                  ['$filter', 'purpleRobot', DemoDialogueFactory]);
})();
