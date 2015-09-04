'use strict';

angular.module('conemoAppApp')
  .factory('conemoConfig', ['$rootScope', function($rootScope) {
    $rootScope.appVersion = "0.3.0";
    
    function ConemoConfig() {}

    ConemoConfig.prototype.get = function() {
      return $.Deferred().resolve(JSON.parse(localStorage.config));
    };

    ConemoConfig.prototype.set = function(config) {
      localStorage.config = JSON.stringify(config);
      $rootScope.$emit('conemoConfig:changed', config);
    };

    return new ConemoConfig();
  }])
  .factory('LessonService', ['$resource', function($resource) {
    return $resource('scripts/lessons.json');
  }])
  .factory('DialogueService', ['$resource', function($resource) {
    return $resource('scripts/dialogues.json');
  }])
  .service('startDateService', function() {
    this.setStartDate = function() {
        if (typeof localStorage.startDate === 'undefined') {
            //could replace later with server side start date
            var startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            localStorage.startDate = startDate;

        } else {
            var startDate = new Date(localStorage.startDate);
            var startDateLog = {
                user_id: localStorage.userId,
                date_created: new Date(),
                start_date: startDate,
                l10n: localStorage.l10n
            };

            PurpleRobotClient.emitReading('start_date', startDateLog).execute();
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
    this.test = function() {
      console.log("i'm a test");
    };
  });
