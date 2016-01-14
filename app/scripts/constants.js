(function() {
  'use strict';

  var Constants = {
    CONFIGURATION_TOKEN_LENGTH: 6,
    DEFAULT_CLIENT_UUID: 'DEFAULT_UUID',
    LESSON_RELEASE_TRIGGER_TIME: { hour: 8, minute: 0, second: 0 }
  };

  angular.module('conemoApp.constants')
         .constant('Constants', Constants);
})();
