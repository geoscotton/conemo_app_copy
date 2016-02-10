(function(context) {
  'use strict';

  var STATUSES = { MessageResolved: 'message_resolved' };

  context.importScripts('../scripts/vendor/es6-promise.min.js');
  context.importScripts('../vendor/lovefield.min.js');
  context.importScripts('../vendor/cache_and_sync_love.min.js');
  context.importScripts('Globals.js');
  context.importScripts('Cache.js');

  context.onmessage = function onMessage(event) {
    var methodCalled;

    if (event.data.resource === 'cache') {
      methodCalled = context.Cache[event.data.method].bind(context.Cache);
    } else {
      var Resource = context.Cache.localResources[event.data.resource] ||
        context.Cache.syncableResources[event.data.resource];
      methodCalled = Resource[event.data.method].bind(Resource);
    }

    Promise.resolve(methodCalled(event.data.argument)).then(function(result) {
      if (event.data.messageId == null) {
        return;
      }

      context.postMessage({
        status: STATUSES.MessageResolved,
        result: result,
        messageId: event.data.messageId
      });
    });
  };

  context.Cache.addTables();
})(this);
