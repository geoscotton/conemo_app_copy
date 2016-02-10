'use strict';

angular.module('conemoAppApp')
  .factory('conemoConfig', [function() {
    $rootScope.appVersion = '1.1.3';
  }])
  .factory('LessonService', ['$resource', function($resource) {
    return $resource('scripts/lessons.json');
  }])
  .service('startDateService', [function() {
    this.setStartDate = function() {
      if (typeof localStorage.startDate === 'undefined') {
        var startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        localStorage.startDate = startDate;
      }
    };

    this.getStartDate = function getStartDate() {
      return localStorage.startDate && new Date(localStorage.startDate);
    };

    this.getDateDiff = function (dateEarlier, dateLater) {
      var oneDayInMs = 1000 * 60 * 60 * 24;

      return (Math.round((dateLater.getTime()-dateEarlier.getTime())/oneDayInMs));
    };

    this.getDaysInTreatment = function() {
         //Get current time zeroed date for comparison with start
          var dateToday = new Date();
          dateToday.setHours(0,0,0,0);
          var startDate = new Date(localStorage.startDate);
          var daysInTreatment = this.getDateDiff(startDate,dateToday)+1;

      return daysInTreatment;
    };
  }]);
