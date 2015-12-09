'use strict';

var expect = chai.expect;

describe('MainController', function() {
  var controller, scope, startDateService, prClient;

  beforeEach(module('conemoAppApp'));

  beforeEach(module(function($provide) {
    startDateService = {
      setStartDate: function() {},
      getDaysInTreatment: function() {}
    };
    sinon.spy(startDateService, 'setStartDate');
    prClient = {
      updateTrigger: function() { return prClient; },
      disableTrigger: function() { return prClient; },
      emitReading: function() { return prClient; },
      vibrate: function() { return prClient; },
      showScriptNotification: function() { return prClient; },
      launchApplication: function() { return prClient; },
      execute: function() {}
    };
    sinon.spy(prClient, 'updateTrigger');

    $provide.constant('startDateService', startDateService);
    window.PurpleRobotClientTmp = window.PurpleRobotClient;
    window.PurpleRobotClient = prClient;
  }));

  afterEach(function() {
    window.PurpleRobotClient = window.PurpleRobotClientTmp;
    delete window.PurpleRobotClientTmp;
  });

  function injectController($controller) {
    scope = {};
    controller = $controller('MainCtrl', { $scope: scope });
  }

  describe('initialization', function() {
    describe('when the userId is cached', function() {
      function cacheUserId() {
        localStorage.userId = 'some pig';
      }

      it('sets the start date', function() {
        cacheUserId();

        inject(injectController);

        expect(startDateService.setStartDate.calledOnce).to.be.true;

        localStorage.clear();
      });

      describe('when the lessonTriggersScheduled is not cached', function() {
        it('creates a trigger for each lesson', function() {
          localStorage.clear();
          cacheUserId();
          inject(function($rootScope) {
            $rootScope.lessons = [
              { dayInTreatment: 1, title: 'lesson 1' },
              { dayInTreatment: 2, title: 'lesson 2' }
            ];
          });

          inject(injectController);

          var expectedArgs = sinon.match({ triggerId: 'LESSON0' });
          expect(prClient.updateTrigger.calledWith(expectedArgs)).to.be.true;

          localStorage.clear();
        });
      });
    });
  });
});
