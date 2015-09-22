(function() {
  'use strict';

  var playPauseId = 'play-pause';
  var pauseLabel = '<img src="pause.png" />';
  var playLabel = '<img src="play.png" />';

  var VideoControl = {
    showButton: function showButton(element, label) {
      element.find('#' + playPauseId).html(label);
    },

    togglePlaying: function togglePlaying(videoElement) {
      videoElement.paused ? videoElement.play() : videoElement.pause();
    },

    addTo: function addTo(element) {
      var videoElement = element.find('video');
      var playPauseButton = '<p style="text-align: center;"><a id="' + playPauseId + '">' + playLabel + '</a></p>';

      videoElement.after(playPauseButton);
      element.find('#' + playPauseId)[0].addEventListener('click', (function() {
        this.togglePlaying(videoElement[0]);
      }).bind(this));
      videoElement[0].addEventListener('playing', (function() {
        this.showButton(element, pauseLabel);
      }).bind(this));
      videoElement[0].addEventListener('pause', (function() {
        this.showButton(element, playLabel);
      }).bind(this));
    }
  };

  angular.module('conemoAppApp').constant('VideoControl', VideoControl);
})();
