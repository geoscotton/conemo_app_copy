(function() {
  'use strict';

  function ConemoVideo($window, VideoControl) {
    function link(scope, element, attrs) {
      var downloader = new $window.Downloader(),
          videoMarkup = downloader.insert('video', attrs.identifier);

      element.append(videoMarkup);
      VideoControl.addTo(element);
    }

    return { link: link };
  }

  angular.module('conemoAppApp')
         .directive('conemoVideo',
                    ['$window', 'VideoControl', ConemoVideo]);
})();
