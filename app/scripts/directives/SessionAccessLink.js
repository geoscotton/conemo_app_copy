(function() {
  'use strict';

  function SessionAccessLink(settings, Resources) {
    return {
      link: function(scope, element) {
        element.on('click', function() {
          Resources.save(Resources.NAMES.SessionEvents, {
            eventType: 'access',
            lessonGuid: scope.lessonGuid,
            dateCreated: new Date(),
            l10n: settings.getL10n()
          });
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
    .directive(
        'sessionAccessLink', ['settings', 'Resources', SessionAccessLink]
    );
})();
