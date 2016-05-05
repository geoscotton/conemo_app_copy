// see https://github.com/angular/angular.js/issues/4516
(function() {
  'use strict';

  function RadioButton() {
    function isRadio(element) {
      return element[0].type.toLowerCase() == 'radio';
    }

    function link(scope, element, attrs, ngModelCtrl) {
      element.on('change', function() {
        scope.$apply(function() {
          ngModelCtrl.$setViewValue(isRadio(element) ? element[0].value : element[0].checked);
        });
      });
    }

    return {
      replace: false,
      require: 'ngModel',
      scope: false,
      link: link
    };
  }

  angular.module('conemoApp.directives').directive('radioButton', [RadioButton]);
})();
