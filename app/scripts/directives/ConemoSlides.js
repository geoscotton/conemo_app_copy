(function() {
  'use strict';

  function buildSlideContent(scope, plannedActivity) {
    scope.slideCount = scope.slides.length;
    scope.plannedActivity = plannedActivity;
    scope.slideIndexOffset = 0;

    if (plannedActivity != null) {
      scope.slideCount = scope.slides.length + 1;
      scope.slideIndexOffset = 1;
    }

    if (scope.selectedLesson.hasActivityPlanning) {
      scope.slideCount = scope.slides.length + 1 + scope.slideIndexOffset;
    }

    scope.isReady = true;
    scope.$digest();
  }

  function ConemoSlides($window, $compile, $sce, VideoControl, Resources) {
    function link(scope, element) {
      scope.unsafe = function(input) { return $sce.trustAsHtml(input); };
      scope.docHeight = angular.element($window).height();

      Resources.fetchLatestUnreportedActivity().then(function(activities) {
        buildSlideContent(scope, activities[0]);
        VideoControl.addTo(element);
      });
    }

    return {
      templateUrl: 'views/conemo-slides.html',
      scope: {
        slides: '=',
        selectedLesson: '='
      },
      link: link
    };
  }

  angular.module('conemoApp.directives')
         .directive('conemoSlides',
                    ['$window', '$compile', '$sce', 'VideoControl', 'Resources',
                     ConemoSlides]);
})();
