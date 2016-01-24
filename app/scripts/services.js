'use strict';

angular.module('conemoAppApp')
  .factory('conemoConfig', [function() {
    $rootScope.appVersion = '1.0.2';
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
    this.getDateDiff = function (dateEarlier, dateLater) {
        var oneDay=1000*60*60*24
        return (Math.round((dateLater.getTime()-dateEarlier.getTime())/oneDay));
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
