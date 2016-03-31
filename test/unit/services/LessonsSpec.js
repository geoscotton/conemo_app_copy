'use strict';

var expect = chai.expect;

describe('Lessons', function() {
  var Lessons, startDatePromise, mockCordova;

  beforeEach(function() {
    module('conemoApp.constants');
    module('conemoApp.services');
    module(function($provide) {
      startDatePromise = Promise.resolve([{ date: moment().format('YYYY-MM-DD') }]);
      var stubResources = {
        fetchEarliestStartDate: function() {
          return startDatePromise;
        }
      };
      var lessons = [
        { dayInTreatment: 0 },
        { dayInTreatment: 5 }
      ];
      mockCordova = {
        plugins: {
          notification: {
            local: {
              schedule: sinon.spy()
            }
          }
        }
      };

      $provide.constant('Resources', stubResources);
      $provide.constant('$window', { moment: moment, cordova: mockCordova });
      $provide.constant('$rootScope', { lessons: lessons });
    });

    inject(function(_Lessons_) {
      Lessons = _Lessons_;
    })
  });

  describe('.scheduleNotifications', function() {
    it('schedules lessons after the first', function(done) {
      Lessons.scheduleNotifications();
      startDatePromise.then(function() {
        expect(mockCordova.plugins.notification.local.schedule.calledOnce).to.be.true;
        done();
      });
    });
  });
});
