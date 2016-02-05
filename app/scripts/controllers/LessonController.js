(function() {
  'use strict';

  var YES = 'Yes', NO = 'No';

  function LessonsController($scope, $routeParams, $location, $timeout,
                             $window, $rootScope, startDateService, Resources) {
    var docHeight = angular.element($window).height();

    $scope.selectedLesson = $rootScope.lessons.find(function(lesson) {
      return lesson.guid === $routeParams.id;
    });

    $scope.slides = $scope.selectedLesson.slides.sort(function(a, b) {
      return a.position - b.position;
    });

    var slideCount = $scope.slides.length;

    function buildSlideContent(lesson, slides, plannedActivity) {
      var slideIndexOffset = 0;

      if (plannedActivity != null) {
        slideCount = $scope.slides.length + 1;
        slideIndexOffset = 1;
      }

      if (lesson.hasActivityPlanning) {
        slideCount = $scope.slides.length + 1 + slideIndexOffset;
      }
    }
    
    $scope.navButtonGenerator = function (slideIndex) {
      if (slideCount == 1) {
        $scope.showHome = true;
        $scope.showBack = false;
        $scope.showNext = false;
      } else if (slideIndex == slideCount - 1) {
        $scope.showHome = true;
        $scope.showBack = true;
        $scope.showNext = false;
      } else if (slideIndex == 0) {
        $scope.showHome = false;
        $scope.showBack = false;
        $scope.showNext = true;
      } else {
        $scope.showHome = false;
        $scope.showBack = true;
        $scope.showNext = true;
      }
    };

    $scope.slideNavigator = function (slidemover) {
      $scope.navButtonGenerator($scope.currentSlideIndex);

      if (typeof (slidemover) !== 'number') {
        switch (slidemover) {
          case 'next':
            $scope.currentSlideIndex++;
            break;
          case 'back':
            $scope.currentSlideIndex--;
            break;
        }
      } 

      angular.element('html, body')
             .animate({ scrollTop: (docHeight * $scope.currentSlideIndex) + 'px' });
    };

    $scope.updatePageCounter = function () {
      $scope.currentSlideIndex = Math.round($window.scrollY / docHeight);
      $scope.pageCounter = ($scope.currentSlideIndex + 1) + ' / ' + slideCount;
      $scope.navButtonGenerator($scope.currentSlideIndex);
    };

    var daysInTreatment = startDateService.getDaysInTreatment();

    $scope.backLabel = $window.l10nStrings.backLabel;
    $scope.nextLabel = $window.l10nStrings.nextLabel;
    $scope.showSlides = false;

    Resources.fetchLatestUnreportedActivity().then(function(activities) {
      buildSlideContent($scope.selectedLesson, slides, activities[0]);

      $scope.currentSlideIndex = 0;
      $scope.pageCounter = ($scope.currentSlideIndex + 1) + ' / ' + slideCount;
      $scope.slideNavigator($scope.currentSlideIndex);

      $timeout(function() {
        var selects = $window.document.getElementsByTagName('select');
        Array.prototype.forEach.call(selects, function(select) {
          select.selectedIndex = -1;
        });
      });
    });

    $scope.saveForm = function (path) {
      var formData = angular.element('form').serializeObject();
      var plannedActivityName = formData['planned-activity-name'];
      var reportedActivityIsComplete = formData['reported-activity-is-complete'];

      if (plannedActivityName != null) {
        Resources.save(Resources.NAMES.PlannedActivities, {
          name: plannedActivityName,
          planned_at: new Date(),
          lesson_guid: $routeParams.id
        });
      }

      if (reportedActivityIsComplete === YES ||
          reportedActivityIsComplete === NO) {
        var isHelpWanted = formData['reported-activity-help-wanted'];
        isHelpWanted = { Yes: true, No: false }[isHelpWanted];

        Resources.save(Resources.NAMES.PlannedActivities, {
          uuid: formData['reported-activity-uuid'],
          name: formData['reported-activity-name'],
          is_complete: reportedActivityIsComplete === YES,
          is_help_wanted: isHelpWanted,
          planned_at: new Date(formData['reported-activity-planned-at']),
          lesson_guid: formData['reported-activity-lesson-guid'],
          level_of_happiness: formData['reported-activity-happiness'],
          how_worthwhile: formData['reported-activity-worthwhile']
        });
      }

      Resources.save(Resources.NAMES.ContentAccessEvents, {
        lesson_guid: $routeParams.id,
        accessed_at: new Date(),
        day_in_treatment_accessed: daysInTreatment
      });

      // mark lesson as read    

      if ($window.lessonsRead.indexOf($scope.selectedLesson.guid) === -1) {
        $window.lessonsRead.push($scope.selectedLesson.guid);
        $window.localStorage.setItem('lessonsRead', JSON.stringify($window.lessonsRead));
      }

      $location.path(path);

      return false;
    };
  }

  angular.module('conemoAppApp')
    .directive('scroll', function ($window) {
      return function(scope, element, attrs) {
        angular.element($window).bind('scroll', function() {
          scope.$apply(attrs.scroll);
        });
        // prevent memory leak by removing global scroll event listener
        element.on('$destroy', function() {
          angular.element($window).unbind('scroll');
        });
      };
    })
    .directive('moDateInput', function ($window) {
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moMediumDate;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
                scope = scope;
                if (!dateFormat || !modelValue) return '';
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                scope = scope;
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : '';
            });
        }
    };
    });

angular.module('conemoApp.controllers')
       .controller(
         'LessonController',
         ['$scope', '$routeParams', '$location', '$timeout', '$window',
          '$rootScope', 'startDateService', 'Resources', LessonsController]
       );
})();
