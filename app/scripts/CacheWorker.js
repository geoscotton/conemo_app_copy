(function(context) {
  'use strict';

  context.importScripts('../vendor/lovefield.min.js');
  context.importScripts('../vendor/cache_and_sync_love.min.js');
  context.importScripts('Cache.js');

  context.onmessage = function onMessage(event) {
    var methodCalled = context.Cache[event.data.resource][event.data.method];
    methodCalled(connection, event.data.argument);
  };

  Cache.addTables();
  Cache.initialize();
})(this);
