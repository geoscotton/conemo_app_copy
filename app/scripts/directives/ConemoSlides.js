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
      scope.slideCount = scope.slides.length + 2 + scope.slideIndexOffset;
    }

    scope.isReady = true;
    scope.$digest();
  }

  function ConemoSlides($window, $compile, $sce, $timeout, VideoControl, Resources) {
    function link(scope, element) {
      scope.unsafe = function(input) { return $sce.trustAsHtml(input); };
      scope.docHeight = angular.element($window).height();
      scope.activityContentPath = 'views/activities/' + $window.l10n + '.html';
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
      scope.$watch('currentSlideIndex', function() {
        $timeout(function() {
          VideoControl.addTo(element);
        }, 10);
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
