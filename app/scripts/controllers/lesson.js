'use strict';

angular.module('conemoAppApp')
    .controller('LessonCtrl', function ($scope, $routeParams, $sce, $location,
                                        $timeout, $window, $rootScope,
                                        startDateService) {
        var docHeight = $(window).height();
        var docWidth = $(window).width();

        var selectedLesson = _.where($rootScope.lessons, {
                guid: $routeParams.id
            })[0];

        var slides = _.sortBy(selectedLesson.slides, 'position');


        var buildSlideContent = function (slides) {

            var concatenatedSlides = '';

            _.each(slides, function (el, idx) {

                concatenatedSlides += '<div style="height:' + docHeight + 'px;" class="slide"  data-index="' + idx + '" data-position="' + el.position + '">' + el.content + '</div>';

            });
            // var videos = $rootScope.downloader.findInstances("video",concatenatedSlides);
            concatenatedSlides = $rootScope.downloader.insert("video",concatenatedSlides);

            return concatenatedSlides;
        };
        
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
            $('html, body').animate({ scrollTop: (docHeight * $scope.currentSlideIndex) + "px" });

        };

        $scope.updatePageCounter = function () {
            $scope.currentSlideIndex = Math.round(pageYOffset/docHeight);
            $scope.pageCounter = ($scope.currentSlideIndex + 1) + " / " + slides.length;
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
        $scope.pageCounter = ($scope.currentSlideIndex + 1) + " / " + slides.length;

        $scope.slideNavigator($scope.currentSlideIndex);

        $scope.saveForm = function (path) {
            var saveContents = {
                user_id: localStorage.userId,
                lesson_guid: $routeParams.id,
                days_in_treatment: daysInTreatment,
                days_in_treatment_assigned: selectedLesson.dayInTreatment,
                date_created: new Date(),
                l10n: localStorage.l10n
            };

            saveContents.form_payload = JSON.stringify($("#slideShowForm").serializeObject());
            (new PurpleRobot()).emitReading('lesson_data', saveContents).execute();

            // mark lesson as read    

            if (lessonsRead.indexOf(selectedLesson.guid) === -1) {
                lessonsRead.push(selectedLesson.guid);
                localStorage.setItem('lessonsRead',JSON.stringify(lessonsRead));

            };
            $location.path(path);
            return false
        };
    })
    .directive("scroll", function ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
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
                if (!dateFormat || !modelValue) return "";
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                scope = scope;
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
            });
        }
    };
    });
