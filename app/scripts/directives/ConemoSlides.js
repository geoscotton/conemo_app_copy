(function() {
  'use strict';

  function ConemoSlides($compile, VideoControl) {
    function link(scope, element, attrs) {
      scope.$watch('slideContent', function(content) {
        if (!content) {
          return;
        }

        var slidesElement = $compile(content.toString())(scope);
        element.html(slidesElement);
        VideoControl.addTo(element);
      });
    }

    return {
      scope: {
        slideContent: '='
      },
      link: link
    };
  }

  angular.module('conemoAppApp')
         .directive('conemoSlides',
                    ['$compile', 'VideoControl', ConemoSlides]);
})();
