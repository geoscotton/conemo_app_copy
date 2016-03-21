(function(context) {
  'use strict';

  var SCHEMA_NAME = 'conemo',
      SCHEMA_VERSION = 10;
  var PAYLOADS_API_PATH = '/api/payloads';
  var STATUSES = {
    Initialized: 'initialized',
    Authenticated: 'authenticated'
  };
  var SYNC_PERIOD_IN_MS = 2 * 60 * 1000;
  var TABLES = {
    AuthenticationTokens: 'authentication_tokens',
    ContentAccessEvents: 'content_access_events',
    Devices: 'devices',
    ExceptionReports: 'exception_reports',
    HelpMessages: 'help_messages',
    Logins: 'logins',
    ParticipantStartDates: 'participant_start_dates',
    PlannedActivities: 'planned_activities',
    SessionEvents: 'session_events'
  };
  var schemaBuilder = context.lf.schema.create(SCHEMA_NAME, SCHEMA_VERSION);

  var Cache = {
    context: context,

    setContext: function setContext(newContext) {
      this.context = newContext;

      return this;
    },

    storeType: context.lf.schema.DataStoreType.INDEXED_DB,

    setStoreType: function setStoreType(type) {
      this.storeType = type;
    },

    localResources: {},

    syncableResources: {},

    defineSchema: function defineSchema() {
      var Types = this.context.lf.Type;

      this.localResources.AuthenticationTokens.createTable()
        .addColumn('value', Types.STRING);

      this.syncableResources.ContentAccessEvents.createTable()
        .addColumn('lesson_guid', this.context.lf.Type.STRING)
        .addColumn('accessed_at', this.context.lf.Type.DATE_TIME)
        .addColumn('day_in_treatment_accessed', this.context.lf.Type.INTEGER)
        .addColumn('response_attributes', this.context.lf.Type.STRING)
        .addNullable(['response_attributes']);
      this.syncableResources.Devices.createTable()
        .addColumn('device_uuid', Types.STRING)
        .addColumn('manufacturer', Types.STRING)
        .addColumn('model', Types.STRING)
        .addColumn('platform', Types.STRING)
        .addColumn('device_version', Types.STRING);
      this.syncableResources.ExceptionReports.createTable()
        .addColumn('url', this.context.lf.Type.STRING)
        .addColumn('app_version', this.context.lf.Type.STRING)
        .addColumn('cause', this.context.lf.Type.STRING)
        .addColumn('stack_trace', this.context.lf.Type.STRING)
        .addColumn('occurred_at', this.context.lf.Type.DATE_TIME)
        .addNullable([
          'url', 'app_version', 'cause', 'stack_trace', 'occurred_at'
        ]);
      this.syncableResources.HelpMessages.createTable()
        .addColumn('message', this.context.lf.Type.STRING)
        .addColumn('sent_at', this.context.lf.Type.DATE_TIME);
      this.syncableResources.Logins.createTable()
        .addColumn('logged_in_at', this.context.lf.Type.DATE_TIME)
        .addColumn('app_version', this.context.lf.Type.STRING)
        .addNullable(['app_version']);
      this.syncableResources.ParticipantStartDates.createTable()
        .addColumn('date', this.context.lf.Type.STRING);
      this.syncableResources.PlannedActivities.createTable()
        .addColumn('name', this.context.lf.Type.STRING)
        .addColumn('is_complete', this.context.lf.Type.BOOLEAN)
        .addColumn('is_help_wanted', this.context.lf.Type.BOOLEAN)
        .addColumn('level_of_happiness', this.context.lf.Type.STRING)
        .addColumn('how_worthwhile', this.context.lf.Type.STRING)
        .addColumn('planned_at', this.context.lf.Type.DATE_TIME)
        .addColumn('follow_up_at', this.context.lf.Type.DATE_TIME)
        .addColumn('lesson_guid', this.context.lf.Type.STRING)
        .addNullable([
          'is_complete', 'is_help_wanted', 'level_of_happiness',
          'how_worthwhile', 'follow_up_at'
        ]);
      this.syncableResources.SessionEvents.createTable()
        .addColumn('lesson_guid', this.context.lf.Type.STRING)
        .addColumn('event_type', this.context.lf.Type.STRING)
        .addColumn('occurred_at', this.context.lf.Type.DATE_TIME);
    },

    onUpgrade: function onUpgrade(rawDb) {
      rawDb.addTableColumn(TABLES.ContentAccessEvents, 'response_attributes');
      rawDb.addTableColumn(TABLES.Logins, 'app_version');

      rawDb.renameTableColumn(TABLES.ContentAccessEvents, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.Devices, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.ExceptionReports, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.HelpMessages, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.ParticipantStartDates, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.PlannedActivities, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.SessionEvents, 'created_at', 'client_created_at');
      rawDb.renameTableColumn(TABLES.ContentAccessEvents, 'updated_at', 'client_updated_at');
      rawDb.renameTableColumn(TABLES.Devices, 'updated_at', 'client_updated_at');
      rawDb.renameTableColumn(TABLES.ExceptionReports, 'updated_at', 'client_updated_at');
      rawDb.renameTableColumn(TABLES.HelpMessages, 'updated_at', 'client_updated_at');
      rawDb.renameTableColumn(TABLES.ParticipantStartDates, 'updated_at', 'client_updated_at');
      rawDb.renameTableColumn(TABLES.PlannedActivities, 'updated_at', 'client_updated_at');
      rawDb.renameTableColumn(TABLES.SessionEvents, 'updated_at', 'client_updated_at');

      rawDb.addTableColumn(TABLES.PlannedActivities, 'follow_up_at');

      return rawDb.dump();
    },

    addTables: function addTables() {
      try {
        this.defineSchema();
        // the db connection must be shared between resources
        var dbConnection = schemaBuilder.connect({
          storeType: this.storeType,
          onUpgrade: this.onUpgrade
        });

        for (var resourceName in this.syncableResources) {
          var resource = this.syncableResources[resourceName];

          resource.dbConnection = dbConnection;
          context.cbit.Synchronizer.registerCache(resource);
        }

        for (var localResourceName in this.localResources) {
          var localResource = this.localResources[localResourceName];

          localResource.dbConnection = dbConnection;
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

                context.cbit.Payload
                  .setUrl(context.Conemo.Globals.SERVER_URL + PAYLOADS_API_PATH)
                  .setSecret(tokens[0].value)
                  .setKey(devices[0].device_uuid);
                context.cbit.Synchronizer.setPayloadResource(context.cbit.Payload);
                context.cbit.Synchronizer.setPeriod(SYNC_PERIOD_IN_MS);
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
  [
    'ContentAccessEvents',
    'Devices',
    'ExceptionReports',
    'HelpMessages',
    'Logins',
    'ParticipantStartDates',
    'PlannedActivities',
    'SessionEvents'
  ].forEach(function(resource) {
    Cache.syncableResources[resource] = Object.create(context.cbit.ResourceCache)
      .setSchemaBuilder(schemaBuilder)
      .setTableName(TABLES[resource]);
  });

  Cache.syncableResources.PlannedActivities.fetchLatestUnreported =
    function fetchLatestUnreported() {
      return this.getDbConnection().then((function(db) {
        var table = this.getTable();

        return db.select().from(table)
                 .where(context.lf.op.and(
                     table.is_complete.isNull(),
                     table.follow_up_at.lte(new Date())))
                 .orderBy(table.follow_up_at, context.lf.Order.DESC)
                 .limit(1)
                 .exec();
      }).bind(this));
    };

  Cache.syncableResources.ParticipantStartDates.fetchLatest = function fetchLatest() {
    return this.getDbConnection().then((function(db) {
      var table = this.getTable();

      return db.select().from(table)
               .orderBy(table.client_created_at, context.lf.Order.DESC)
               .limit(1)
               .exec();
    }).bind(this));
  };

  context.Cache = Cache;
})(this);
