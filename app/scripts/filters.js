'use strict';

angular.module('conemoAppApp')
  .filter('translate', [function() {
    function translate(key) {
      var t = _.find(i18nStrings.generalContent, { l10n: localStorage.l10n });
      var today = new Date();
      var currentMonth = today.getMonth();
      if (typeof t === 'undefined') {
        return 'locale not found: ' + localStorage.l10n;
      } 
      else if (key === 'months') {
        return t[key][currentMonth];
      }
      else if (typeof t[key] === 'undefined') {
        return 'translation not found: ' + localStorage.l10n + ' => ' + key;
      }

      return t[key];
    }

    return function(key) {
      return translate(key);
    };
  }])
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
      };
  });
