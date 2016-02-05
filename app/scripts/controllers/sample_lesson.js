(function() {
  'use strict';

  function SampleLessonController($window, l10n) {
    this.storage = $window.localStorage;
    this.l10n = l10n;
  }

  SampleLessonController.prototype.getL10n = function() {
    return this.l10n;
  };

  SampleLessonController.prototype.demoNotification = function() {
    this.storage.onResume = '#/sample_lesson';
  };

  angular.module('conemoAppApp')
         .controller('SampleLessonController',
                     ['$window', 'l10n',
                      SampleLessonController]);
})();
