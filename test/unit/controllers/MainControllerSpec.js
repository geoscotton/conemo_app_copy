'use strict';

var expect = chai.expect;

describe('MainController', function() {
  var scope, startDateService, cordovaPlugins,
      isFirstNotificationPresent = true;

  beforeEach(module('conemoAppApp'));

  beforeEach(module(function($provide) {
    startDateService = {
      setStartDate: function() {},
      getDaysInTreatment: function() {}
    };
    sinon.spy(startDateService, 'setStartDate');
    cordovaPlugins = { notification: { local: {
      isPresent: function(i, cb) { cb(isFirstNotificationPresent); },
      schedule: function() {}
    } } };
    sinon.spy(cordovaPlugins.notification.local, 'schedule');

    $provide.constant('startDateService', startDateService);
  }));

  function injectController($controller) {
    scope = {};
    $controller('MainCtrl', {
                  $scope: scope,
                  $window: {
                    cordova: { plugins: cordovaPlugins },
                    l10nStrings: {},
                    moment: moment
                  }
                });
  }

  describe('initialization', function() {
    it('sets the start date', function() {
      inject(function($rootScope) {
        $rootScope.lessons = [];
      });
      inject(injectController);

      expect(startDateService.setStartDate.calledOnce).to.be.true;

      localStorage.clear();
    });

    describe('when there are no lesson notifications scheduled', function() {
      it('schedules each lesson', function() {
        isFirstNotificationPresent = false;

        localStorage.clear();
        inject(function($rootScope) {
          $rootScope.lessons = [
            { dayInTreatment: 1, title: 'lesson 1' },
            { dayInTreatment: 2, title: 'lesson 2' }
          ];
        });

        inject(injectController);

        var plugin = cordovaPlugins.notification.local;
        expect(plugin.schedule.calledOnce).to.be_true;
        expect(plugin.schedule.args[0][0].length).to.eq(1);
        expect(plugin.schedule.args[0][0][0].id).to.eq(0);
        expect(plugin.schedule.args[0][0][0].title).to.eq('CONEMO');
        expect(plugin.schedule.args[0][0][0].text).to.eq('lesson 2');
        expect(plugin.schedule.args[0][0][0].at).not.to.be_null;

        localStorage.clear();
      });
    });
  });
});
