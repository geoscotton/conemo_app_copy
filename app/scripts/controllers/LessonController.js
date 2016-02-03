(function() {
  'use strict';

  function LessonsController($scope, $routeParams, $sce, $location, $timeout,
                             $window, $rootScope, startDateService, Resources) {
    var docHeight = angular.element($window).height();

    var selectedLesson = $rootScope.lessons.find(function(lesson) {
      return lesson.guid === $routeParams.id;
    });

    var slides = selectedLesson.slides.sort(function(a, b) {
      return a.position - b.position;
    });

    var slideCount = slides.length;

    function activityReportTemplate(activity) {
      return '<div style="height:' + docHeight +
             'px;" class="slide"  data-index="' + 0 +
             '" data-position="' + 1 + '">' +
               'Did you ' + activity.name + '?<br>' +
               '<div>' +
                 '<label>' +
                   '<input name="isComplete" ng-model="isComplete" type="radio" value="Yes"> ' +
                 'Yes</label> ' +
                 '<label><input name="isComplete" ng-model="isComplete" type="radio" value="No"> ' +
                 'No</label>' +
               '</div>' +
               '<span ng-show="isComplete === \'Yes\'">' +
                 'Great!' +
                 '<div>How happy did it make you?' +
                   '<select name="reported-activity-happiness">' +
                     '<option>3 - Really Happy</option>' +
                   '</select>' +
                 '</div>' +
                 '<div>How worthwhile do you think it was?' +
                   '<select name="reported-activity-worthwhie">' +
                     '<option>4 - Very Worthwhile</option>' +
                   '</select>' +
                 '</div>' +
               '</span>' +
             '</div>';
    }

    function activityPlanTemplate() {
      return '<div style="height:' + docHeight +
             'px;" class="slide"  data-index="' + slideCount +
             '" data-position="' + (slideCount + 1) + '">' +
             'Can you do something before the next 5 days are up??<br>' +
             'What can you do?' +
             '<select name="planned-activity-name"><option>Play ping pong!</option></select>' +
             '</div>';
    }

    function buildSlideContent(lesson, slides, plannedActivity) {
      var activityReport = '',
          slideIndexOffset = 0,
          activityPlan = '';

      if (plannedActivity != null) {
        activityReport = activityReportTemplate(plannedActivity);
        slideCount = slides.length + 1;
        slideIndexOffset = 1;
      }

      if (lesson.hasActivityPlanning) {
        activityPlan = activityPlanTemplate(slideIndexOffset);
        slideCount = slides.length + 1 + slideIndexOffset;
      }

      return activityReport + slides.map(function (el, idx) {
        return '<div style="height:' + docHeight +
               'px;" class="slide"  data-index="' + (idx + slideIndexOffset) +
               '" data-position="' + (el.position + slideIndexOffset) + '">' +
               el.content + '</div>';
      }).join('') + activityPlan;
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
      var content = buildSlideContent(selectedLesson, slides, activities[0]);

      $scope.slideContent = $sce.trustAsHtml(content);
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
      var plannedActivityName =
        angular.element('form')
               .serializeObject()['planned-activity-name'];

      if (plannedActivityName != null) {
        Resources.save(Resources.NAMES.PlannedActivities, {
          name: plannedActivityName,
          planned_at: new Date(),
          lesson_guid: $routeParams.id
        });
      }

      Resources.save(Resources.NAMES.ContentAccessEvents, {
        lesson_guid: $routeParams.id,
        accessed_at: new Date(),
        day_in_treatment_accessed: daysInTreatment
      });

      // mark lesson as read    

      if ($window.lessonsRead.indexOf(selectedLesson.guid) === -1) {
        $window.lessonsRead.push(selectedLesson.guid);
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
         ['$scope', '$routeParams', '$sce', '$location', '$timeout', '$window',
          '$rootScope', 'startDateService', 'Resources', LessonsController]
       );
})();
