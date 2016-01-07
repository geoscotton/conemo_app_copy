'use strict';

var expect = chai.expect;

describe('Cache', function() {
  describe('.initialize', function() {
    describe('when an authentication token is not present', function() {
      it('posts the initialized status message', function(done) {
        Cache.AuthenticationTokens.setStoreType(lf.schema.DataStoreType.MEMORY);
        Cache.addTables();
        Cache.setContext({
          lf: lf,
          postMessage: function(message) {
            expect(message.status).to.eq('initialized');
            done();
          }
        });

        Cache.initialize();
      });
    });

    describe('when an authentication token is present', function() {
      it('posts the authenticated status message', function(done) {
        Cache.AuthenticationTokens.setStoreType(lf.schema.DataStoreType.MEMORY);
        Cache.addTables();
        var connection = Cache.getDbConnection();
        Cache.AuthenticationTokens.persist(connection, { value: 'asdf' }).then(function() {
          Cache.setContext({
            lf: lf,
            postMessage: function(message) {
              expect(message.status).to.eq('authenticated');
              done();
            }
          });

          Cache.initialize();
        });
      });
    });
  });
});
