'use strict';

var expect = chai.expect;

describe('SampleLessonController', function() {
  var controller, mockDemoNotification;

  beforeEach(module('conemoAppApp'));

  beforeEach(module(function($provide) {
    mockDemoNotification = {
      execute: sinon.spy()
    };

    $provide.constant('l10n', 'wookie');
    $provide.constant('demoNotification', mockDemoNotification);
  }));

  beforeEach(inject(function($controller) {
    controller = $controller('SampleLessonController');
  }));

  describe('#getL10n', function() {
    it('returns the l10n setting', function() {
      expect(controller.getL10n()).to.equal('wookie');
    });
  });

  describe('#demoNotification', function() {
    it('sets the onResume location', function() {
      controller.demoNotification();

      expect(localStorage.onResume).to.equal('#/sample_lesson');
    });
  });
});
