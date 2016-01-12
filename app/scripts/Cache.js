(function(context) {
  'use strict';

  var SCHEMA_NAME = 'conemo',
      SCHEMA_VERSION = 1;
  var STATUSES = {
    Initialized: 'initialized',
    Authenticated: 'authenticated'
  };
  var TABLES = {
    AuthenticationTokens: 'authentication_tokens',
    StaffMessages: 'staff_messages'
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

    resources: {},

    defineSchema: function defineSchema() {
      this.resources.AuthenticationTokens.createTable()
        .addColumn('value', this.context.lf.Type.STRING);
      this.resources.StaffMessages.createTable()
        .addColumn('message', this.context.lf.Type.STRING)
        .addColumn('date_created', this.context.lf.Type.DATE_TIME)
        .addColumn('l10n', this.context.lf.Type.STRING);
    },

    addTables: function addTables() {
      try {
        this.defineSchema();
        // the db connection must be shared between resources
        var dbConnection = schemaBuilder.connect({ storeType: this.storeType });
        for (var resource in this.resources) {
          this.resources[resource].dbConnection = dbConnection;
        }
      } catch (error) {
        // schema is finalized
        if (context.DEBUG) {
          context.console.log(error);
        }
      }
    },

    initialize: function initialize() {
      this.resources.AuthenticationTokens.fetchAll()
        .then((function(results) {
          if (results.length > 0) {
            this.context.postMessage({ status: STATUSES.Authenticated });
          } else {
            this.context.postMessage({ status: STATUSES.Initialized });
          }
        }).bind(this));
    }
  };

  Cache.resources.AuthenticationTokens = Object.create(context.cbit.LocalResource)
    .setSchemaBuilder(schemaBuilder)
    .setTableName(TABLES.AuthenticationTokens);
  Cache.resources.StaffMessages = Object.create(context.cbit.ResourceCache)
    .setSchemaBuilder(schemaBuilder)
    .setTableName(TABLES.StaffMessages);

  context.Cache = Cache;
})(this);
