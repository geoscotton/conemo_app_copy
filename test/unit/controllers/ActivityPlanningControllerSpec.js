'use strict';

var expect = chai.expect;

describe('ActivityPlanningController', function() {
  var controller, mockResources;

  beforeEach(module('conemoApp.controllers'));

  beforeEach(module(function($provide) {
    mockResources = {
      NAMES: { PlannedActivities: 'planned_activities' },
      save: sinon.spy()
    };

    $provide.constant('Resources', mockResources);
  }));

  beforeEach(inject(function($controller) {
    controller = $controller('ActivityPlanningController');
  }));

  describe('#savePlannedActivity', function() {
    it('saves the activity choice', function() {
      controller.activity = 'asdf';

      controller.savePlannedActivity();

      expect(mockResources.save.calledWithMatch(
        'planned_activities',
        { value: 'asdf' }
      )).to.be.true;
    });
  });
});
