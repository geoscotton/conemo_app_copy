(function() {
  'use strict';

  function ContactsController($window, Resources) {
    this.contactTypes = $window.l10nStrings.contactTypes;

    this.contactStaff = function contactStaff(message) {
      var messageData = {
        message: message,
        sent_at: new Date()
      };
      Resources.save(Resources.NAMES.HelpMessages, messageData);
      this.successAlertVisible = true;
    };
  }

  angular.module('conemoAppApp')
    .controller(
      'ContactCtrl',
      ['$window', 'Resources', ContactsController]
    );
})();
