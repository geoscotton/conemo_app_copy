'use strict';

var expect = chai.expect;

describe('MainController', function() {
  var scope, Resources;

  beforeEach(module('conemoAppApp'));

  function injectController($controller) {
    scope = {
      $digest: function() {}
    };
    Resources = {
                  getDaysInTreatment: function() {
                    return Promise.resolve(3);
                  }
                };
    $controller('MainCtrl', {
                  $scope: scope,
                  Lessons: {
                    getDateSortedLessons: function() {
                      return [{ dayInTreatment: 2, title: 'Title!', guid: 'guid' }];
                    }
                  },
                  Resources: Resources
                });
  }

  describe('initialization', function() {
    it('sets the current lesson title', function(done) {
      inject(injectController);

      Resources.getDaysInTreatment().then(function() {
        expect(scope.currentLessonTitle).to.eq('Title!');
        done();
      });
    });
  });
});
