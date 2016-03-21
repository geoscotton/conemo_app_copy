(function() {
  'use strict';

  angular.module('conemoAppApp')
    .factory('LessonService', ['$resource', function($resource) {
      return $resource('scripts/lessons.json');
    }]);
})();
