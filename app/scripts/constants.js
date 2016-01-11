(function() {
  'use strict';

  var Constants = {
    CONFIGURATION_TOKEN_LENGTH: 6,
    SERVER_URL: 'SERVER_URL_TO_REPLACE',
    LESSON_RELEASE_TRIGGER_TIME: { hour: 8, minute: 0, second: 0 },
    DB_SCHEMA_VERSION: 1
  };

  angular.module('conemoApp.constants')
         .constant('Constants', Constants);
})();
