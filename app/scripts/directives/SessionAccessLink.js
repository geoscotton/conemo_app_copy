(function() {
  'use strict';

  function SessionAccessLink(Resources) {
    return {
      link: function(scope, element) {
        element.on('click', function() {
          Resources.save(Resources.NAMES.SessionEvents, {
            event_type: 'access',
            lesson_guid: scope.lessonGuid,
            occurred_at: new Date()
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
        'sessionAccessLink', ['Resources', SessionAccessLink]
    );
})();
