'use strict';

var expect = chai.expect;

describe('SessionAccessLink', function() {
  var $compile, scope, Resources;

  beforeEach(module('conemoApp.directives'));

  beforeEach(module(function($provide) {
    var settings = {
          getL10n: function() { return 'Hoth'; }
        },
        translateFilter = function() {};
    Resources = {
      save: sinon.spy(),
      NAMES: { SessionEvents: 'session_events' }
    };

    $provide.constant('settings', settings);
    $provide.constant('translateFilter', translateFilter);
    $provide.constant('Resources', Resources);
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  it('saves a reading on each click', function() {
    var el = $compile('<session-access-link guid="guid0" />')(scope);

    scope.$digest();
    el.triggerHandler('click');

    var readingMatch = sinon.match({ event_type: 'access' });
    expect(Resources.save.calledWith('session_events', readingMatch))
      .to.be.true;
  });
});
