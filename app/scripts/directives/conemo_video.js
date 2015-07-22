(function() {
  'use strict';

  function ConemoVideo($window) {
    function link(scope, element, attrs) {
      var downloader = new $window.Downloader(),
          videoMarkup = downloader.insert('video', attrs.identifier);

      element.append(videoMarkup);
    }

    return { link: link };
  }

  angular.module('conemoAppApp')
         .directive('conemoVideo',
                    ['$window', ConemoVideo]);
})();
