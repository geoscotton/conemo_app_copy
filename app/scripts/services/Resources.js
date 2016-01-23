(function(context) {
  'use strict';

  var WORKER_SCRIPT = 'scripts/CacheWorker.js';

  var Resources = {
    STATUS: { AUTHENTICATED: 'authenticated' },

    NAMES: {
      AuthenticationTokens: 'AuthenticationTokens',
      Devices: 'Devices',
      HelpMessages: 'HelpMessages'
    },

    save: function save(resourceType, data) {
      if (this.worker == null) {
        throw new Error('Expected reference to a Worker was null');
      }

      this.worker.postMessage({
        resource: resourceType,
        method: 'persist',
        argument: data
      });
    },

    authenticate: function authenticate() {
      if (this.authentication == null) {
        this.authentication = new Promise((function(resolve, reject) {
          this.authenticated = resolve;
          this.notAuthenticated = reject;
        }).bind(this));
        this.loadWorker();
        this.initializeCache();
      }

      return this.authentication;
    },

    onWorkerMessage: function onWorkerMessage(event) {
      if (event.data.status === this.STATUS.AUTHENTICATED) {
        this.authenticated();
      } else {
        this.notAuthenticated();
        this.authentication = null;
        this.authenticated = null;
        this.notAuthenticated = null;
      }
    },

    onWorkerError: function onWorkerError(event) {
      context.alert('An error occurred: ' + event.message);
    },

    initializeCache: function initializeCache() {
      this.worker.postMessage({ resource: 'cache', method: 'initialize' });
    },

    loadWorker: function loadWorker(loader) {
      if (this.worker != null) {
        return;
      }

      if (loader == null) {
        loader = context.Worker;
      }

      this.worker = new loader(WORKER_SCRIPT);
      this.worker.onmessage = this.onWorkerMessage.bind(this);
      this.worker.onerror = this.onWorkerError.bind(this);
    }
  };

  angular.module('conemoApp.services')
    .constant('Resources', Resources);
})(this);
