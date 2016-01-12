(function() {
  'use strict';

  function ContactsController($scope, $window, Resources) {
    this.contactTypes = $window.l10nStrings.contactTypes;

    this.contactStaff = function contactStaff(message) {
      var message = {
        message: message,
        date_created: new Date(),
        l10n: $window.localStorage.l10n
      };
      Resources.save(Resources.NAMES.StaffMessages, message);
      this.successAlertVisible = true;
    };
  }

  angular.module('conemoAppApp')
    .controller(
      'ContactCtrl',
      ['$scope', '$window', 'Resources', ContactsController]
    );
})();
