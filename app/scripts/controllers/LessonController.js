(function() {
  'use strict';

  var YES = 'Yes', NO = 'No', INCOMPLETE = 'incomplete';

  function LessonsController($scope, $routeParams, $location,
                             $window, $rootScope, Resources) {
    $scope.selectedLesson = $rootScope.lessons.find(function(lesson) {
      return lesson.guid === $routeParams.id;
    });

    $scope.slides = $scope.selectedLesson.slides.sort(function(a, b) {
      return a.position - b.position;
    });

    $scope.activityChoices = $window.l10nStrings.activityChoices;

    var slideCount = $scope.slides.length;

    function buildSlideContent(lesson, plannedActivity) {
      var slideIndexOffset = 0;

      if (plannedActivity != null) {
        slideCount = $scope.slides.length + 2;
        slideIndexOffset = 2;
      }

      if (lesson.hasActivityPlanning) {
        slideCount = $scope.slides.length + 2 + slideIndexOffset;
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
      $scope.updatePageCounter();
    };

    $scope.updatePageCounter = function () {
      $scope.pageCounter = ($scope.currentSlideIndex + 1) + ' / ' + slideCount;
      $scope.navButtonGenerator($scope.currentSlideIndex);
    };

    $scope.backLabel = $window.l10nStrings.backLabel;
    $scope.nextLabel = $window.l10nStrings.nextLabel;
    $scope.showSlides = false;

    Resources.fetchLatestUnreportedActivity().then(function(activities) {
      buildSlideContent($scope.selectedLesson, activities[0]);

      $scope.currentSlideIndex = 0;
      $scope.pageCounter = ($scope.currentSlideIndex + 1) + ' / ' + slideCount;
      $scope.slideNavigator($scope.currentSlideIndex);
      if (activities[0] == null) {
        $scope.plannedLesson = null;
      } else {
        $scope.plannedLesson = $rootScope.lessons.find(function(lesson) {
          return lesson.guid === activities[0].lesson_guid;
        });
      }
      $scope.$digest();
    });

    $scope.saveForm = function (path) {
      var formData = angular.element('form').serializeObject();
      var plannedActivityName = formData['planned-activity-name'];
      var reportedActivityIsComplete = formData['reported-activity-is-complete'] || INCOMPLETE;

      if (plannedActivityName != null) {
        Resources.save(Resources.NAMES.PlannedActivities, {
          name: plannedActivityName,
          planned_at: new Date(),
          follow_up_at: $window.moment(formData['reported-activity-planned-at'])
                               .add($scope.selectedLesson.feedbackAfterDays, 'days')
                               .toDate(),
          lesson_guid: $routeParams.id
        });
      }

      if (reportedActivityIsComplete === YES ||
          reportedActivityIsComplete === NO) {
        Resources.save(Resources.NAMES.PlannedActivities, {
          uuid: formData['reported-activity-uuid'],
          name: formData['reported-activity-name'],
          is_complete: reportedActivityIsComplete === YES,
          planned_at: new Date(formData['reported-activity-planned-at']),
          follow_up_at: new Date(formData['reported-activity-follow-up-at']),
          lesson_guid: formData['reported-activity-lesson-guid'],
          level_of_happiness: formData['reported-activity-happiness'],
          how_worthwhile: formData['reported-activity-worthwhile']
        });
      }

      var lessonGuid = $routeParams.id;
      Resources.getDaysInTreatment().then(function(daysInTreatment) {
        Resources.save(Resources.NAMES.ContentAccessEvents, {
          lesson_guid: lessonGuid,
          accessed_at: new Date(),
          day_in_treatment_accessed: daysInTreatment,
          response_attributes: JSON.stringify({ answer: formData })
        });
      });

      $location.path(path);

      return false;
    };
  }

  angular.module('conemoAppApp')
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
         ['$scope', '$routeParams', '$location', '$window',
          '$rootScope', 'Resources', LessonsController]
       );
})();
