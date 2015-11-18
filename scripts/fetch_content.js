module.exports = function(context) {
  // This hook requests and saves remote lesson content.
  var request = require('sync-request'),
      fs = require('fs'),
      path = require('path'),
      rootDir = context.opts.projectRoot;

  var dataToCopy = [
    {
      'https://conemo.northwestern.edu/api/dialogues.json':
        'app/scripts/dialogues.json'
    },
    {
      'https://conemo.northwestern.edu/api/lessons.json':
        'app/scripts/lessons.json'
    }
  ];

  dataToCopy.forEach(function(dataMap) {
    Object.keys(dataMap).forEach(function(srcUrl) {
      var destFile = path.join(rootDir, dataMap[srcUrl]);
      var response = request('GET', srcUrl);

      fs.writeFile(destFile, response.getBody());
    });
  });
};
