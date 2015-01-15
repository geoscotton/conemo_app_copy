'use strict';

angular.module('conemoAppApp')
  .filter('translate', ['$rootScope', 'conemoConfig', function($rootScope, conemoConfig) {
    var data = null,
        serviceInvoked = false;

    function translate(key) {
      var t = _.find(i18nStrings.generalContent, { l10n: data.l10n });
      var today = new Date();
      var currentMonth = today.getMonth();
      if (typeof t === 'undefined') {
        return 'locale not found: ' + data.l10n;
      } 
      else if (key === 'months') {
        return t[key][currentMonth];
      }
      else if (typeof t[key] === 'undefined') {
        return 'translation not found: ' + data.l10n + ' => ' + key;
      }

      return t[key];
    }

    return function(key) {
      if (data === null) {
        if (!serviceInvoked) {
          serviceInvoked = true;
          // update the translation on load
          conemoConfig.get().then(function(config) {
            data = config;
          });
          // update the translation on l10n change
          $rootScope.$on('conemoConfig:changed', function(event, config) {
            data = config;
          });
        }

        return '';
      } else {
        return translate(key);
      }
    };
  }])
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
      };
  });
