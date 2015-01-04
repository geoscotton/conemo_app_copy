'use strict';

angular.module('conemoAppApp')
  .controller('InstructionsCtrl', function ($scope, $rootScope, $routeParams) {

    localStorage['onResume'] = '';
    $scope.instructionsLabel = l10nStrings.instructionsLabel;

    $scope.$watch('checked', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            var videocontainerES = document.getElementById('samplevideo-es');
            var videocontainerPT = document.getElementById('samplevideo-pt');

            var downloader = new Downloader();
            videocontainerES.innerHTML = downloader.insert("video",videocontainerES.textContent);
            videocontainerPT.innerHTML = downloader.insert("video",videocontainerPT.textContent);

        }
    });

    $scope.checked = false;

    if ($routeParams.key == 'showSample'){
        $scope.checked = true;
        window.scrollTo(0,document.body.scrollHeight);
    }

    $scope.toggleChecked = function() {
        $scope.checked = $scope.checked === false ? true: false;
    };

    $scope.l10n = l10n;
    $scope.demoDialogue_esPE = function() {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate("buzz").showNativeDialog({
        title: "CONEMO: ",
        message: "¿Has podido seguir las instrucciones de esta sesión de entrenamiento?",
        buttonLabelA: "No",
        scriptA: PurpleRobotClient.showNativeDialog({
                        title: "CONEMO: ",
                        message: "¡Pregunta a tu enfermera todas tus dudas! Te ayudará a usar el aplicativo la mejor manera posible.",
                        buttonLabelA: "OK",
                        scriptA: PurpleRobotClient.doNothing(),
                        buttonLabelB: "",
                        scriptB: PurpleRobotClient.doNothing(),
                        tag: "",
                        priority: 1
                    }),
        buttonLabelB: "Sí",
        scriptB: PurpleRobotClient.showNativeDialog({
                        title: "CONEMO: ",
                        message: "¡Qué bien! ¡Empecemos!",
                        buttonLabelA: "OK",
                        scriptA: PurpleRobotClient.doNothing(),
                        buttonLabelB: "",
                        scriptB: PurpleRobotClient.doNothing(),
                        tag: "",
                        priority: 1
                    }),
        tag: "CONEMO EJEMPLO",
        priority: 1
      }).execute();
    };
    $scope.demoDialogue_ptBR = function() {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate("buzz").showNativeDialog({
        title: "CONEMO: ",
        message: "Benvindo ao CONEMO!",
        buttonLabelA: "Não",
        scriptA: PurpleRobotClient.doNothing(),
        buttonLabelB: "Sim",
        scriptB: PurpleRobotClient.doNothing(),
        tag: "CONEMO",
        priority: 1
      }).execute();
    };
    $scope.demoNotification_esPE = function() {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate("buzz").showScriptNotification({
        title: "CONEMO: ",
        message: "¡Bienvenido a CONEMO!",
        isPersistent: true,
        isSticky: false,
        script: PurpleRobotClient.doNothing()
      }).execute();
    };
    $scope.demoNotification_ptBR = function() {
      localStorage['onResume'] = '#/instructions/showSample';
      PurpleRobotClient.vibrate("buzz").showScriptNotification({
        title: "CONEMO: ",
        message: "Benvindo ao CONEMO!",
        isPersistent: true,
        isSticky: false,
        script: PurpleRobotClient.doNothing()
      }).execute();
    };
});