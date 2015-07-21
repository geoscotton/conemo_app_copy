(function() {
  'use strict';

  function SampleLessonController($window, l10n, demoDialogue, demoNotification) {
    this.storage = $window.localStorage;
    this.l10n = l10n;
    this.dialogue = demoDialogue;
    this.notification = demoNotification;
  }

  SampleLessonController.prototype.getL10n = function() {
    return this.l10n;
  };

  SampleLessonController.prototype.demoDialogue = function() {
    this.storage.onResume = '#/sample_lesson';
    this.dialogue.execute(this.l10n);
  };

  SampleLessonController.prototype.demoNotification = function() {
    this.storage.onResume = '#/sample_lesson';
    this.notification.execute(this.l10n);
  };

  angular.module('conemoAppApp')
         .controller('SampleLessonController',
                     ['$window', 'l10n', 'demoDialogue', 'demoNotification',
                      SampleLessonController]);
})();
