(function() {
  'use strict';

  function Settings($window) {
    this.getUserId = function getUserId() {
      return $window.localStorage.userId;
    };

    this.getL10n = function getL10n() {
      return $window.localStorage.l10n;
    };
  }

  angular.module('conemoApp.services')
         .service('settings', Settings);
})();
