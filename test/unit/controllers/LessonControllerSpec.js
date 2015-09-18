'use strict';

var expect = chai.expect;

describe('LessonController', function() {
  var controller, scope;

  beforeEach(module('conemoAppApp'));

  describe('initialization', function() {
    it('sets the back label', function() {
      var guid = '123';
      scope = {}
      window._alert = window.alert;
      window.alert = function() {};

      inject(function($controller, $rootScope) {
        $rootScope.lessons = [{ guid: guid }];
        $controller('LessonCtrl', {
                      $scope: scope,
                      $rootScope: $rootScope,
                      $routeParams: { id: guid }
                    });
      });

      expect(scope.backLabel).to.eq('Anterior');

      window.alert = window._alert;
    });
  });
});
