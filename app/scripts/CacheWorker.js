(function(context) {
  'use strict';

  context.importScripts('../vendor/lovefield.min.js');
  context.importScripts('../vendor/cache_and_sync_love.min.js');
  context.importScripts('Cache.js');

  context.onmessage = function onMessage(event) {
    var methodCalled;

    if (event.data.resource === 'cache') {
      methodCalled = context.Cache[event.data.method].bind(context.Cache);
    } else {
      var Resource = context.Cache.resources[event.data.resource];
      methodCalled = Resource[event.data.method].bind(Resource);
    }

    methodCalled(event.data.argument);
  };

  context.Cache.addTables();
})(this);
