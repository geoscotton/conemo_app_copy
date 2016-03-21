'use strict';

var expect = chai.expect;

describe('LessonController', function() {
  var latestUnreportedActivity = Promise.resolve([]);
  var Resources = {
    NAMES: { ContentAccessEvents: 'content_access_events' },
    save: sinon.spy(),
    fetchLatestUnreportedActivity: function() {
      return latestUnreportedActivity;
    },
    getDaysInTreatment: function() { return Promise.resolve(1); }
  };

  function injectController($controller, $rootScope) {
    $controller('LessonController', {
                  $scope: scope,
                  $rootScope: $rootScope,
                  $routeParams: { id: guid },
                  Resources: Resources
                });
  }

  function lessonPages(options) {
    function injectFn($controller, $rootScope) {
      $rootScope.lessons = [
        {
          guid: guid,
          slides: slides,
          hasActivityPlanning: options.hasActivityPlanning || false
        },
        { guid: 'baz', slides: [] }
      ];
      injectController($controller, $rootScope);
    }

    var slides = [];

    for (var i = 0; i < options.count; i++) {
      slides.push({ position: i, content: 'slide body ' + i });
    }

    return injectFn;
  }

  var scope, guid = '123';

  beforeEach(module('conemoAppApp'));

  beforeEach(function() {
    window._alert = window.alert;
    window.alert = function() {};
    scope = { selectedLesson: { slides: [] }, $digest: function() {} };
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
    describe('when there is 1 slide', function() {
      it('sets showHome', function() {
        inject(lessonPages({ count: 1 }));

        scope.slideNavigator();

        expect(scope.showHome).to.be.true;
      });
    });

    describe('when on the last slide of > 1', function() {
      it('sets showHome and showBack', function() {
        inject(lessonPages({ count: 2 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator();

        expect(scope.showHome).to.be.true;
        expect(scope.showBack).to.be.true;
      });
    });

    describe('when on the first slide of > 1', function() {
      it('sets showNext', function() {
        inject(lessonPages({ count: 2 }));
        scope.currentSlideIndex = 0;

        scope.slideNavigator();

        expect(scope.showNext).to.be.true;
      });
    });

    describe('when on an inner slide', function() {
      it('sets showBack and showNext', function() {
        inject(lessonPages({ count: 3 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator();

        expect(scope.showBack).to.be.true;
        expect(scope.showNext).to.be.true;
      });
    });

    describe('when passed "next"', function() {
      it('increments the slide index', function() {
        inject(lessonPages({ count: 0 }));
        scope.currentSlideIndex = 1;

        scope.slideNavigator('next');

        expect(scope.currentSlideIndex).to.eq(2);
      });
    });

    describe('when passed "back"', function() {
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
    it('saves the data', function(done) {
      inject(lessonPages({ count: 0 }));

      scope.saveForm();

      var eventMatch = sinon.match({ lesson_guid: guid });
      Resources.getDaysInTreatment().then(function() {
        expect(Resources.save.calledWith('content_access_events', eventMatch))
          .to.be.true;
        done();
      });
    });
  });
});
