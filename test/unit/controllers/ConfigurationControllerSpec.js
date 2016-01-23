'use strict';

var expect = chai.expect;

describe('ConfigurationController', function() {
  var xhr, requests;

  beforeEach(module('conemoApp.controllers'));

  beforeEach(module(function($provide) {
    var mockLessonService = { get: function() {} };

    $provide.constant('LessonService', mockLessonService);
  }));

  beforeEach(inject(function() {
    // use this instead of $httpBackend because auth token request does not use
    // jquery
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  }));

  afterEach(function() {
    xhr.restore();
  });

  describe('#tokenPattern', function() {
    it('matches tokens with 6 characters plus whitespace', function() {
      inject(function($controller) {
        var controller = $controller('ConfigurationController');
        expect(controller.tokenPattern.test('abcdef')).to.be.true;
        expect(controller.tokenPattern.test(' a  bcd ef ')).to.be.true;
      });
    });

    it('does not match tokens with fewer than 6 characters total', function() {
      inject(function($controller) {
        var controller = $controller('ConfigurationController');
        expect(controller.tokenPattern.test('abcde')).to.be.false;
        expect(controller.tokenPattern.test(' a  bcd')).to.be.false;
      });
    });
  });

  describe('#createAuthenticationToken', function() {
    describe('when the token is successfully created', function() {
      it('emits the value', function(done) {
        inject(function($controller, $rootScope) {
          var tokenListener = sinon.spy();
          $rootScope.$on('authentication_token_created', tokenListener);

          $controller('ConfigurationController', {
            $rootScope: $rootScope,
            $window: { console: { log: function() {} }, device: { uuid: '1234' } }
          }).createAuthenticationToken().then(function() {
            expect(tokenListener.args[0][1]).to.eq('token1');
            done();
          });
          requests[0].respond(201, { 'Content-Type': 'application/json' },
                              '{"data":{"value":"token1"}}');
        });
      });
    });
  });
});
