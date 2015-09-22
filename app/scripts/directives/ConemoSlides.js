(function() {
  'use strict';

  function ConemoSlides($compile) {
    var playPauseId = 'play-pause';
    var pauseLabel = '<img src="pause.png" />';
    var playLabel = '<img src="play.png" />';

    function showButton(element, label) {
      element.find('#' + playPauseId).html(label);
    }

    function togglePlaying(videoElement) {
      videoElement.paused ? videoElement.play() : videoElement.pause();
    }

    function addVideoControl(element) {
      var videoElement = element.find('video');
      var playPauseButton = '<p style="text-align: center;"><a id="' + playPauseId + '">' + playLabel + '</a></p>';

      videoElement.after(playPauseButton);
      element.find('#' + playPauseId)[0].addEventListener('click', function() { togglePlaying(videoElement[0]); });
      videoElement[0].addEventListener('playing', function() { showButton(element, pauseLabel); });
      videoElement[0].addEventListener('pause', function() { showButton(element, playLabel); });
    }

    function link(scope, element, attrs) {
      scope.$watch('slideContent', function(content) {
        if (!content) {
          return;
        }

        var slidesElement = $compile(content.toString())(scope);
        element.html(slidesElement);
        addVideoControl(element);
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
                    ['$compile', ConemoSlides]);
})();
