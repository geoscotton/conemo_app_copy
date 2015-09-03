(function() {
  'use strict';

  var Constants = {
    LESSON_RELEASE_TRIGGER_TIME: { hour: 8, minute: 0, second: 0 },
    DIALOGUE_RELEASE_TRIGGER_TIME: { hour: 8, minute: 1, second: 0 }
  };

  angular.module('conemoApp.constants')
         .constant('Constants', Constants);
})();
