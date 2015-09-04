'use strict';

var expect = chai.expect;

describe('SessionAccessLink', function() {
  var $compile, scope, purpleRobot;

  beforeEach(module('conemoApp.directives'));

  beforeEach(module(function($provide) {
    var settings = {
          getUserId: function() { return 'userId0'; },
          getL10n: function() { return 'Hoth'; }
        },
        translateFilter = function() {};
    purpleRobot = {
      emitReading: function() { return purpleRobot; },
      execute: function() {}
    };

    $provide.constant('settings', settings);
    $provide.constant('translateFilter', translateFilter);
    $provide.constant('purpleRobot', purpleRobot);
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  it('emits a purple robot reading on each click', function() {
    var el = $compile('<session-access-link guid="guid0" />')(scope);
    sinon.spy(purpleRobot, 'emitReading');

    scope.$digest();
    el.triggerHandler('click');

    var readingMatch = sinon.match({ eventType: 'access' });
    expect(purpleRobot.emitReading.calledWith('session_events', readingMatch)).to.be.true;
  });
});
