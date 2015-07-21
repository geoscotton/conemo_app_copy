(function() {
  'use strict';

  function PurpleRobotFactory($window) {
    return new $window.PurpleRobot();
  }

  angular.module('conemoAppApp')
         .factory('purpleRobot',
                  ['$window', PurpleRobotFactory]);
})();
