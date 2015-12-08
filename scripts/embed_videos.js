module.exports = function(context) {
  var fs = require('fs'),
      lessonsFile = 'app/scripts/lessons.json';

  var data = fs.readFileSync(lessonsFile, 'utf8');
  data.match(/video[A-Z]{2}\d/g).forEach(function(video) {
    var name = video.replace('video', '');
    data = data.replace(video, '\\u003cvideo style=\\"max-width:100%;\\"\\u003e\\u003csource type=\\"video/mp4\\" src=\\"videos/' + name + '.mp4\\" /\\u003e\\u003c/video\\u003e');
  });

  fs.writeFileSync(lessonsFile, data, 'utf8');
};
