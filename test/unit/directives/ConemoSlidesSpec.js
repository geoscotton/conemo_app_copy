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
    $provide.constant('VideoControl', null);
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();

    var directiveTemplate = null;
    var req = new XMLHttpRequest();
    req.onload = function() { directiveTemplate = this.responseText; };
    req.open('get', '../app/views/conemo-slides.html', false);
    req.send();
    $templateCache.put('views/conemo-slides.html', directiveTemplate);
  }));

  beforeEach(function() {
    latestUnreportedActivity = Promise.resolve([]);
  });

  describe('with no planned or reported activities present', function() {
    it('counts only content slides', function(done) {
      var element = $compile('<div conemo-slides slides="slides"></div>')(scope);

      scope.slides = [{}, {}];
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
      latestUnreportedActivity = Promise.resolve([{}]);
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
      expect(element.html()).to.match(/ng-bind-html="unsafe\(slide.content\)"/);
      done();
    });
  });

  it('adds a planned activity question if required', function(done) {
    var element = $compile(
      '<div conemo-slides slides="slides" selected-lesson="selectedLesson"></div>'
    )(scope);

    scope.slides = [];
    scope.selectedLesson = { hasActivityPlanning: true };
    scope.isReady = true;
    scope.$digest();

    latestUnreportedActivity.then(function() {
      expect(element.html()).to.match(/Can you do something/);
      done();
    });
  });

  it('adds an activity report question if required', function() {
    var element = $compile(
      '<div conemo-slides slides="slides" selected-lesson="selectedLesson"></div>'
    )(scope);

    scope.slides = [];
    scope.selectedLesson = { hasActivityPlanning: false };
    latestUnreportedActivity = Promise.resolve([{}]);
    scope.isReady = true;
    scope.$digest();

    latestUnreportedActivity.then(function() {
      expect(element.html()).to.match(/Did you/);
      done();
    });
  });
});
