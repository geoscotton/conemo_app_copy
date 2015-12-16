(function() {
  'use strict';

  function SessionAccessLink(purpleRobot, settings) {
    return {
      link: function(scope, element) {
        element.on('click', function() {
          purpleRobot
            .emitReading('session_events', {
              eventType: 'access',
              userId: settings.getUserId(),
              lessonGuid: scope.lessonGuid,
              dateCreated: new Date(),
              l10n: settings.getL10n()
            })
            .execute();
        });
      },
      restrict: 'E',
      scope: {
        lessonGuid: '=guid'
      },
      template: '<a href="#/lesson/{{ lessonGuid }}" class="btn btn-primary">' +
                '{{ "beginLessonButtonLabel" | translate }}</a>'
    };
  }

  angular.module('conemoApp.directives')
         .directive('sessionAccessLink', SessionAccessLink);
})();
