(function(context) {
  'use strict';

  function createMessage(worker, options) {
    if (worker == null) {
      throw new Error('Expected reference to a Worker was null');
    }

    var message = {
      onResolve: null,
      onReject: null,
      messageId: Math.floor(Math.random() * 1000000000)
    };
    message.promise = new Promise(function(resolve, reject) {
      message.onResolve = resolve;
      message.onReject = reject;
    });
    Messages[message.messageId] = message;
    options.messageId = message.messageId;
    worker.postMessage(options);

    return message.promise;
  }

  var WORKER_SCRIPT = 'scripts/CacheWorker.js';

  var Messages = {};

  var Resources = {
    STATUSES: {
      Initialized: 'initialized',
      Authenticated: 'authenticated',
      MessageResolved: 'message_resolved'
    },

    NAMES: {
      AuthenticationTokens: 'AuthenticationTokens',
      ContentAccessEvents: 'ContentAccessEvents',
      Devices: 'Devices',
      ExceptionReports: 'ExceptionReports',
      HelpMessages: 'HelpMessages',
      Logins: 'Logins',
      ParticipantStartDates: 'ParticipantStartDates',
      PlannedActivities: 'PlannedActivities',
      SessionEvents: 'SessionEvents'
    },

    save: function save(resourceType, data) {
      return createMessage(this.worker, {
        resource: resourceType,
        method: 'persist',
        argument: data
      });
    },

    fetchLatestUnreportedActivity: function fetchLatestUnreportedActivity() {
      return createMessage(this.worker, {
        resource: this.NAMES.PlannedActivities,
        method: 'fetchLatestUnreported'
      });
    },

    fetchEarliestStartDate: function fetchEarliestStartDate() {
      return createMessage(this.worker, {
        resource: this.NAMES.ParticipantStartDates,
        method: 'fetchEarliest'
      });
    },

    getDaysInTreatment: function getDaysInTreatment() {
      return this.fetchEarliestStartDate().then(function(startDates) {
        if (startDates.length === 0) {
          return 1;
        }

        return context.moment().diff(startDates[0].date, 'days') + 1;
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

    getReadLessonIds: function getReadLessonIds() {
      return createMessage(this.worker, {
        resource: this.NAMES.ContentAccessEvents,
        method: 'fetchAll'
      }).then(function(events) {
        return events.map(function(accessEvent) {
          return accessEvent.lesson_guid;
        });
      });
    },

    onWorkerMessage: function onWorkerMessage(event) {
      if (event.data.status === this.STATUSES.Authenticated) {
        this.authenticated();
      } else if (event.data.status === this.STATUSES.Initialized) {
        this.notAuthenticated();
        this.authentication = null;
        this.authenticated = null;
        this.notAuthenticated = null;
      } else if (event.data.status === this.STATUSES.MessageResolved) {
        var message = Messages[event.data.messageId];
        message.onResolve(event.data.result);
        delete Messages[event.data.messageId];
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
