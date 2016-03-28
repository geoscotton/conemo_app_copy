'use strict';

var expect = chai.expect;

describe('ConemoSlides', function() {
  var $compile, scope, Resources;
  var latestUnreportedActivity;

  beforeEach(module('conemoApp.directives'));

  beforeEach(module(function($provide) {
    Resources = {
      fetchLatestUnreportedActivity: function() {
        return latestUnreportedActivity;
      }
    };

    $provide.constant('Resources', Resources);
    $provide.constant('VideoControl', { addTo: function() {} });
    $provide.constant('translateFilter', function(value) { return value; });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();

    var directiveTemplate = null;
    var req = new XMLHttpRequest();
    req.onload = function() { directiveTemplate = this.responseText; };
    ['conemo-slides.html', 'activities/pt-BR.html'].forEach(function(t) {
      req.open('get', '../app/views/' + t, false);
      req.send();
      $templateCache.put('views/' + t, directiveTemplate);
    });
  }));

  beforeEach(function() {
    latestUnreportedActivity = Promise.resolve([]);
  });

  describe('with no planned or reported activities present', function() {
    it('counts only content slides', function(done) {
      var element = $compile(
        '<div conemo-slides slides="slides" selected-lesson="selectedLesson"></div>'
      )(scope);

      scope.slides = [{}, {}];
      scope.selectedLesson = {};
      scope.$digest();

      latestUnreportedActivity.then(function() {
        expect(element.isolateScope().slideCount).to.eq(2);
        done();
      });
    });
  });

  describe('when reported and planned activities are present', function() {
    it('counts content and form input slides', function(done) {
      var element = $compile(
        '<div conemo-slides slides="slides" selected-lesson="selectedLesson"></div>'
      )(scope);

      scope.slides = [{}];
      scope.selectedLesson = { hasActivityPlanning: true };
      latestUnreportedActivity = Promise.resolve([]);
      scope.$digest();

      latestUnreportedActivity.then(function() {
        expect(element.isolateScope().slideCount).to.eq(3);
        done();
      });
    });
  });

  it('renders the slides', function(done) {
    var element = $compile(
      '<div conemo-slides slides="slides" selected-lesson="selectedLesson"></div>'
    )(scope);

    scope.slides = [{}];
    scope.selectedLesson = { hasActivityPlanning: false };
    scope.isReady = true;
    scope.$digest();

    latestUnreportedActivity.then(function() {
      expect(element.html()).to.match(/ng-bind-html="unsafe\(slide.content/);
      done();
    });
  });

  it('adds a planned activity question if required', function(done) {
    var element = $compile(
      '<div conemo-slides slides="slides" selected-lesson="selectedLesson" ' +
      'current-slide-index="currentSlideIndex"></div>'
    )(scope);

    scope.slides = [];
    scope.selectedLesson = {
      hasActivityPlanning: true,
      prePlanningContent: 'Can you do something'
    };
    scope.currentSlideIndex = 0;
    scope.isReady = true;
    scope.$digest();

    latestUnreportedActivity.then(function() {
      expect(element.html()).to.match(/Can you do something/);
      done();
    });
  });

  it('adds an activity report question if required', function(done) {
    var element = $compile(
      '<div conemo-slides slides="slides" selected-lesson="selectedLesson" ' +
      'current-slide-index="currentSlideIndex"></div>'
    )(scope);

    scope.slides = [];
    scope.selectedLesson = { hasActivityPlanning: false };
    latestUnreportedActivity = Promise.resolve([{}]);
    scope.currentSlideIndex = 0;
    scope.isReady = true;
    scope.$digest();

    latestUnreportedActivity.then(function() {
      expect(element.html()).to.match(/didYouDoActivity/);
      done();
    });
  });
});
