(function(context) {
  'use strict';

  context.importScripts('../vendor/lovefield.min.js');
  context.importScripts('../vendor/cache_and_sync_love.min.js');
  context.importScripts('Cache.js');

  context.onmessage = function onMessage(event) {
    var Resource = context.Cache[event.data.resource];
    var methodCalled = Resource[event.data.method].bind(Resource);

    methodCalled(event.data.argument);
  };

  Cache.addTables();
  Cache.initialize();
})(this);
