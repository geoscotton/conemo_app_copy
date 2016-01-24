(function(context) {
  'use strict';

  var SCHEMA_NAME = 'conemo',
      SCHEMA_VERSION = 1;
  var PAYLOADS_API_PATH = '/api/payloads';
  var STATUSES = {
    Initialized: 'initialized',
    Authenticated: 'authenticated'
  };
  var TABLES = {
    AuthenticationTokens: 'authentication_tokens',
    Devices: 'devices',
    HelpMessages: 'help_messages',
    ParticipantStartDates: 'participant_start_dates'
  };
  var schemaBuilder = context.lf.schema.create(SCHEMA_NAME, SCHEMA_VERSION);

  var Cache = {
    context: context,

    setContext: function setContext(newContext) {
      this.context = newContext;

      return this;
    },

    storeType: lf.schema.DataStoreType.INDEXED_DB,

    setStoreType: function setStoreType(type) {
      this.storeType = type;
    },

    localResources: {},

    syncableResources: {},

    defineSchema: function defineSchema() {
      var Types = this.context.lf.Type;

      this.localResources.AuthenticationTokens.createTable()
        .addColumn('value', Types.STRING);
      this.syncableResources.Devices.createTable()
        .addColumn('device_uuid', Types.STRING)
        .addColumn('manufacturer', Types.STRING)
        .addColumn('model', Types.STRING)
        .addColumn('platform', Types.STRING)
        .addColumn('device_version', Types.STRING);
      this.syncableResources.HelpMessages.createTable()
        .addColumn('message', this.context.lf.Type.STRING)
        .addColumn('sent_at', this.context.lf.Type.DATE_TIME);
      this.syncableResources.ParticipantStartDates.createTable()
        .addColumn('date', this.context.lf.Type.STRING);
    },

    addTables: function addTables() {
      try {
        this.defineSchema();
        // the db connection must be shared between resources
        var dbConnection = schemaBuilder.connect({ storeType: this.storeType });

        for (var resourceName in this.syncableResources) {
          var resource = this.syncableResources[resourceName];

          resource.dbConnection = dbConnection;
          context.cbit.Synchronizer.registerCache(resource);
        }

        for (var resourceName in this.localResources) {
          var resource = this.localResources[resourceName];

          resource.dbConnection = dbConnection;
        }

        context.cbit.Synchronizer
          .setNetwork({
            // punt on this
            hasConnection: function() { return true; }
          });
      } catch (error) {
        // schema is finalized
        if (context.DEBUG) {
          context.console.log(error);
        }
      }
    },

    initialize: function initialize() {
      this.localResources.AuthenticationTokens.fetchAll()
        .then((function(tokens) {
          if (tokens.length > 0) {
            this.context.postMessage({ status: STATUSES.Authenticated });
            this.syncableResources.Devices.fetchAll()
              .then(function(devices) {
                if (devices.length == 0) {
                  return;
                }

                cbit.Payload
                  .setUrl(context.Conemo.Globals.SERVER_URL + PAYLOADS_API_PATH)
                  .setSecret(tokens[0].value)
                  .setKey(devices[0].device_uuid);
                context.cbit.Synchronizer.setPayloadResource(cbit.Payload);
                context.cbit.Synchronizer.run();
              });
          } else {
            this.context.postMessage({ status: STATUSES.Initialized });
          }
        }).bind(this));
    }
  };

  Cache.localResources.AuthenticationTokens = Object.create(context.cbit.LocalResource)
    .setSchemaBuilder(schemaBuilder)
    .setTableName(TABLES.AuthenticationTokens);
  ['Devices', 'HelpMessages', 'ParticipantStartDates'].forEach(function(resource) {
    Cache.syncableResources[resource] = Object.create(context.cbit.ResourceCache)
      .setSchemaBuilder(schemaBuilder)
      .setTableName(TABLES[resource]);
  });

  context.Cache = Cache;
})(this);
