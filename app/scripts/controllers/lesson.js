(function() {
  'use strict';

  function LessonsController($scope, $routeParams, $sce, $location, $timeout,
                             $window, $rootScope, startDateService, Resources) {
    var docHeight = $($window).height();

    var selectedLesson = $rootScope.lessons.find(function(lesson) {
      return lesson.guid === $routeParams.id;
    });

    var slides = selectedLesson.slides.sort(function(a, b) {
      return a.position - b.position;
    });

    function buildSlideContent(slides) {
      return slides.map(function (el, idx) {
        return '<div style="height:' + docHeight +
               'px;" class="slide"  data-index="' + idx +
               '" data-position="' + el.position + '">' +
               el.content + '</div>';
      }).join();
    }
    
    $scope.navButtonGenerator = function (slideIndex) {
      if (slides.length == 1) {
        $scope.showHome = true;
        $scope.showBack = false;
        $scope.showNext = false;
      } else if (slideIndex == slides.length - 1) {
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

      $('html, body').animate({ scrollTop: (docHeight * $scope.currentSlideIndex) + 'px' });
    };

    $scope.updatePageCounter = function () {
      $scope.currentSlideIndex = Math.round(pageYOffset/docHeight);
      $scope.pageCounter = ($scope.currentSlideIndex + 1) + ' / ' + slides.length;
      $scope.navButtonGenerator($scope.currentSlideIndex);
    };

    var daysInTreatment = startDateService.getDaysInTreatment();

    $scope.backLabel = l10nStrings.backLabel;
    $scope.nextLabel = l10nStrings.nextLabel;
    $scope.showSlides = false;
    $scope.slideContent = $sce.trustAsHtml(buildSlideContent(slides));
    $timeout(function() {
      var selects = $window.document.getElementsByTagName('select');
      Array.prototype.forEach.call(selects, function(select) {
        select.selectedIndex = -1;
      });
    });
    $scope.currentSlideIndex = 0;
    $scope.pageCounter = ($scope.currentSlideIndex + 1) + ' / ' + slides.length;

    $scope.slideNavigator($scope.currentSlideIndex);

    $scope.saveForm = function (path) {
      Resources.save(Resources.NAMES.ContentAccessEvents, {
        lesson_guid: $routeParams.id,
        accessed_at: new Date(),
        day_in_treatment_accessed: daysInTreatment
      });

      // mark lesson as read    

      if (lessonsRead.indexOf(selectedLesson.guid) === -1) {
        lessonsRead.push(selectedLesson.guid);
        localStorage.setItem('lessonsRead',JSON.stringify(lessonsRead));
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
            })
        }
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
