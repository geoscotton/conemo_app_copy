(function() {
  'use strict';

  function DemoNotificationFactory($filter, purpleRobot) {
    function DemoNotification() {}

    DemoNotification.prototype.execute = function() {
      purpleRobot
        .vibrate('buzz')
        .showScriptNotification({
          title: 'CONEMO: ',
          message: $filter('translate')('welcomeToConemo'),
          isPersistent: true,
          isSticky: false,
          script: purpleRobot.doNothing()
        })
        .execute();
    };

    return new DemoNotification();
  }

  angular.module('conemoAppApp')
         .factory('demoNotification',
                  ['$filter', 'purpleRobot', DemoNotificationFactory]);
})();
