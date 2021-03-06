(function() {
  'use strict';

  function buildSlideContent(scope, element, plannedActivity) {
    scope.slideCount = scope.slides.length;
    scope.plannedActivity = plannedActivity;
    scope.slideIndexOffset = 0;

    if (plannedActivity != null) {
      scope.slideCount = scope.slides.length + 2;
      scope.slideIndexOffset = 2;
    }

    if (scope.selectedLesson.hasActivityPlanning) {
      scope.slideCount = scope.slides.length + 3 + scope.slideIndexOffset;
    }

    scope.isReady = true;
    scope.$digest();

    var selects = element.find('select');
    Array.prototype.forEach.call(selects, function(select) {
      select.selectedIndex = -1;
    });
  }

  function ConemoSlides($window, $compile, $sce, $timeout, VideoControl, Resources) {
    function link(scope, element) {
      scope.unsafe = function(input) { return $sce.trustAsHtml(input); };
      scope.activityContentPath = 'views/activities/' + $window.l10n + '.html';
      scope.activityFollowUpContentPath = 'views/activities/' + $window.l10n + '-follow-up.html';
      scope.plannedActivity = {
        isComplete: null
      };
      scope.selectedActivity = {
        value: null
      };

      Resources.fetchLatestUnreportedActivity().then(function(activities) {
        buildSlideContent(scope, element, activities[0]);
        VideoControl.addTo(element);
      });
    }

    return {
      templateUrl: 'views/conemo-slides.html',
      scope: {
        activityChoices: '=',
        currentSlideIndex: '=',
        slides: '=',
        selectedLesson: '=',
        plannedLesson: '='
      },
      link: link
    };
  }

  angular.module('conemoApp.directives')
         .directive('conemoSlides',
                    ['$window', '$compile', '$sce', '$timeout', 'VideoControl', 'Resources',
                     ConemoSlides]);
})();
