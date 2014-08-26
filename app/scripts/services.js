'use strict';

angular.module('conemoAppApp')
  .factory('conemoConfig', ['$rootScope', function($rootScope) {
    $rootScope.appVersion = "0.1.25";
    
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
  }]);
