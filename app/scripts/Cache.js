(function(context) {
  'use strict';

  var SCHEMA_NAME = 'conemo',
      SCHEMA_VERSION = 1;
  var STATUSES = {
    Initialized: 'initialized',
    Authenticated: 'authenticated'
  };
  var TABLES = {
    AuthenticationTokens: 'authentication_tokens'
  };
  var schemaBuilder = context.lf.schema.create(SCHEMA_NAME, SCHEMA_VERSION);

  var AuthenticationTokens = Object.create(context.cbit.LocalResource)
    .setSchemaBuilder(schemaBuilder)
    .setTableName(TABLES.AuthenticationTokens);

  var Cache = {
    context: context,

    setContext: function setContext(newContext) {
      this.context = newContext;

      return this;
    },

    addTables: function addTables() {
      try {
        AuthenticationTokens.createTable()
          .addColumn('value', this.context.lf.Type.STRING);
      } catch (error) {
        // schema is finalized
        if (context.DEBUG) {
          context.console.log(error);
        }
      }
    },

    initialize: function initialize() {
      AuthenticationTokens.fetchAll()
        .then((function(results) {
          if (results.length > 0) {
            this.context.postMessage({ status: STATUSES.Authenticated });
          } else {
            this.context.postMessage({ status: STATUSES.Initialized });
          }
        }).bind(this));
    },

    AuthenticationTokens: AuthenticationTokens
  };

  context.Cache = Cache;
})(this);
