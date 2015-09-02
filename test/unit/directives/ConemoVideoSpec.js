'use strict';

var expect = chai.expect;

describe('ConemoVideo', function() {
  var $compile, $rootScope;

  beforeEach(module('conemoAppApp'));

  beforeEach(module(function($provide) {
    var mockGlobal;

    function MockDownloader() {}

    MockDownloader.prototype.insert = function() {
      return 'inserted video';
    };

    mockGlobal = {
      Downloader: MockDownloader
    };

    $provide.constant('$window', mockGlobal);
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    // required (for now) due to the way the run phase is configured
    _$httpBackend_.when('GET', 'scripts/lessons.json').respond();
    _$httpBackend_.when('GET', 'scripts/dialogues.json').respond();
  }));

  it('appends the video markup to the element', function() {
    var element = $compile('<div conemo-video></div>')($rootScope);
    // required (for now) due to the way the run phase is configured
    localStorage.config = '{}';

    $rootScope.$digest();

    expect(element.html()).to.equal('inserted video');

    localStorage.clear();
  });
});
