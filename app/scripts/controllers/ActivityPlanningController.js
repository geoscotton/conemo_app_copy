(function() {
  'use strict';

  function ActivityPlanningController(Resources) {
    this.savePlannedActivity = function savePlannedActivity() {
      Resources.save(Resources.NAMES.PlannedActivities, {
        value: this.activity,
        savedAt: new Date()
      });
    };
  }

  angular
    .module('conemoApp.controllers')
    .controller(
      'ActivityPlanningController',
      ['Resources', ActivityPlanningController]
    );
})();
