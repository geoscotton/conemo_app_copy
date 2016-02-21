(function() {
  'use strict';

  function NgExceptionHandler($window, $delegate, $injector) {
    function report(data) {
      // avoid a circular dependency by using the injector
      var Resources = $injector.get('Resources');
      Resources.save(Resources.NAMES.ExceptionReports, data);
    }

    return function(exception){
      $delegate(exception);

      var data = {
        url: $window.location.hash,
        occurred_at: new Date(),
        app_version: $window.Conemo.Globals.VERSION
      };

      if (exception) {
        if (exception.message) {
          data.cause  = exception.message;
        }

        if (exception.stack) {
          data.stack_trace = exception.stack.replace(/[<>]/g, '');
        }
      }

      report(data);
    };
  }

  function JSExceptionHandler($window, Resources) {
    function report(data) {
      Resources.save(Resources.NAMES.ExceptionReports, data);
    }

    $window.onerror = function(message, url, line, col, error){
      var stopPropagation = true;
      var data = {
        url: $window.location.hash,
        occurred_at: new Date(),
        app_version: $window.Conemo.Globals.VERSION
      };

      if (message) {
        data.cause = message;
      }

      if (error) {
        if (error.stack) {
          data.stack_trace = error.stack.replace(/[<>]/g, '');;
        }
      }

      report(data);

      return stopPropagation;
    };
  }

  angular
    .module('conemoApp.services')
    .config(['$provide', function($provide) {
      $provide.decorator(
        '$exceptionHandler',
        ['$window', '$delegate', '$injector', NgExceptionHandler]
      )
    }])
    .service(
      'JSExceptionHandler',
      ['$window', 'Resources', JSExceptionHandler]
    )
    .run(['JSExceptionHandler', function() {}]);
})();
