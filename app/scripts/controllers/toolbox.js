'use strict';

angular.module('conemoAppApp')
  .controller('ToolboxCtrl', function ($scope, $rootScope) {

	 var dateToday = new Date();
	 dateToday.setHours(0,0,0,0);

	 var dateDiff = function (dateEarlier, dateLater) {
	      var oneDay=1000*60*60*24
	      return (  Math.round((dateLater.getTime()-dateEarlier.getTime())/oneDay)  );
	  }

	 var daysInTreatment = dateDiff(startDate,dateToday)+1;
   $scope.availableLessons = _.filter($rootScope.lessons,function(el){return el.dayInTreatment <= daysInTreatment});
   $scope.beginLessonButtonLabel = l10nStrings.beginLessonButtonLabel;
});
