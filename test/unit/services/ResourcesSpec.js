'use strict';

var expect = chai.expect;

describe('Resources', function() {
  var Resources;

  beforeEach(module('conemoApp.services'));

  beforeEach(inject(function(_Resources_) {
    Resources = _Resources_;
  }));

  describe('.save', function() {
    describe('when a Worker has been loaded', function() {
      it('posts a message to the Worker', function() {
        var resources = Object.create(Resources),
            postMessage = sinon.spy(),
            data = { foo: 1, bar: 'asdf' };

        function worker() {
          this.postMessage = postMessage;
        }

        resources.loadWorker(worker);
        resources.save('FooType', data);

        expect(postMessage.calledWith({
          resource: 'FooType',
          method: 'persist',
          argument: data,
          messageId: sinon.match.any
        })).to.be.true;
      });
    });

    describe('when a Worker has not been loaded', function() {
      it('throws an error', function() {
        var resources = Object.create(Resources),
            data = { foo: 1, bar: 'asdf' };

        expect(function() {
          resources.save('FooType', data);
        }).to.throw(Error, /Expected reference to a Worker/);
      });
    });
  });

  describe('authenticating', function() {
    describe('when authenticated', function() {
      it('resolves', function(done) {
        var resources = Object.create(Resources);
        resources.loadWorker(function() {
          this.onmessage = null;
          this.postMessage = function() {
            window.setTimeout((function() {
              this.onmessage({
                data: { status: Resources.STATUSES.Authenticated }
              });
            }).bind(this), 0);
          };
        });

        resources.authenticate().then(done);
      });
    });

    describe('when not authenticated', function() {
      it('rejects', function(done) {
        var resources = Object.create(Resources);
        resources.loadWorker(function() {
          this.onmessage = null;
          this.postMessage = function() {
            window.setTimeout((function() {
              this.onmessage({
                data: { status: 'initialized' }
              });
            }).bind(this), 0);
          };
        });

        resources.authenticate().catch(done);
      });
    });
  });
});
