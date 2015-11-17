'use strict';

var expect = chai.expect;

describe('LessonController', function() {
  function injectController($controller, $rootScope) {
    $controller('LessonCtrl', {
                  $scope: scope,
                  $rootScope: $rootScope,
                  $routeParams: { id: guid }
                });
  }

  function lessonPages(options) {
    function injectFn($controller, $rootScope) {
      $rootScope.lessons = [{ guid: guid, slides: slides }];
      injectController($controller, $rootScope);
    }

    var slides = [];

    for (var i = 0; i < options.count; i++) {
      slides.push({ position: i });
    }

    return injectFn;
  }

  var $httpBackend, scope, guid = '123';

  beforeEach(module('conemoAppApp'));

  beforeEach(function() {
    window._alert = window.alert;
    window.alert = function() {};
    scope = {};
  });

  afterEach(function() {
    window.alert = window._alert;
  });

  describe('initialization', function() {
    it('sets the back label', function() {
      inject(lessonPages({ count: 0 }));

      expect(scope.backLabel).to.eq('Anterior');
    });
  });

  describe('#slideNavigator', function() {
    context('when there is 1 slide', function() {
      it('sets showHome', function() {
        inject(lessonPages({ count: 1 }));

        scope.slideNavigator();

        expect(scope.showHome).to.be.true;
      });
    });

    context('when on the last slide of > 1', function() {
      it('sets showHome and showBack', function() {
        inject(lessonPages({ count: 2 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator();

        expect(scope.showHome).to.be.true;
        expect(scope.showBack).to.be.true;
      });
    });

    context('when on the first slide of > 1', function() {
      it('sets showNext', function() {
        inject(lessonPages({ count: 2 }));
        scope.currentSlideIndex = 0;

        scope.slideNavigator();

        expect(scope.showNext).to.be.true;
      });
    });

    context('when on an inner slide', function() {
      it('sets showBack and showNext', function() {
        inject(lessonPages({ count: 3 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator();

        expect(scope.showBack).to.be.true;
        expect(scope.showNext).to.be.true;
      });
    });

    context('when passed "next"', function() {
      it('increments the slide index', function() {
        inject(lessonPages({ count: 0 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator('next');

        expect(scope.currentSlideIndex).to.eq(2);
      });
    });

    context('when passed "back"', function() {
      it('decrements the slide index', function() {
        inject(lessonPages({ count: 0 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator('back');

        expect(scope.currentSlideIndex).to.eq(0);
      });
    });
  });

  describe('#updatePageCounter', function() {
    it('updates the slide index based on where the scroll is', function() {
      inject(lessonPages({ count: 0 }));

      scope.updatePageCounter();

      expect(scope.currentSlideIndex).to.eq(0);
    });

    it('updates the page counter', function() {
      inject(lessonPages({ count: 2 }));

      scope.updatePageCounter();

      expect(scope.pageCounter).to.eq('1 / 2');
    });

    it('sets showHome, showBack, and showNext accordingly', function() {
      inject(lessonPages({ count: 2 }));

      scope.updatePageCounter();

      expect(scope.showHome).to.be.false;
      expect(scope.showBack).to.be.false;
      expect(scope.showNext).to.be.true;
    });
  });

  describe('#saveForm', function() {
    it('emits data to Purple Robot', function() {
      inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
      });
      inject(lessonPages({ count: 0 }));

      $httpBackend.expectPOST('/json/submit');

      scope.saveForm();
    });
  });
});
