'use strict';

var expect = chai.expect;

describe('SampleLessonController', function() {
  var controller, mockDemoDialogue, mockDemoNotification;

  beforeEach(module('conemoAppApp'));

  beforeEach(module(function($provide) {
    mockDemoDialogue = {
      execute: sinon.spy()
    };
    mockDemoNotification = {
      execute: sinon.spy()
    };

    $provide.constant('l10n', 'wookie');
    $provide.constant('demoDialogue', mockDemoDialogue);
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

  describe('#demoDialogue', function() {
    it('sets the onResume location', function() {
      controller.demoDialogue();

      expect(localStorage.onResume).to.equal('#/sample_lesson');
    });

    it('executes the appropriate l10n dialog', function() {
      controller.demoDialogue();

      expect(mockDemoDialogue.execute.calledOnce).to.be.true;
      expect(mockDemoDialogue.execute.args[0][0]).to.equal('wookie');
    });
  });

  describe('#demoNotification', function() {
    it('sets the onResume location', function() {
      controller.demoNotification();

      expect(localStorage.onResume).to.equal('#/sample_lesson');
    });

    it('executes the appropriate l10n notification', function() {
      controller.demoNotification();

      expect(mockDemoNotification.execute.calledOnce).to.be.true;
      expect(mockDemoNotification.execute.args[0][0]).to.equal('wookie');
    });
  });
});
