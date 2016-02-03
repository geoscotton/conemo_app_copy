module.exports = function(context) {
  var fs = require('fs-extra'),
      filenames = [
        'www/scripts/Globals.js',
        'www/index.html',
        'config.xml'
      ];

  function replaceStringInFile(filename, toReplace, replaceWith) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(new RegExp(toReplace, "g"), replaceWith);
    fs.writeFileSync(filename, result, 'utf8');
  }

  if (process.env.API_SERVER) {
    fs.copySync('config.xml', 'config.xml.bak');
    filenames.forEach(function(filename) {
      replaceStringInFile(filename, 'SERVER_URL_TO_REPLACE',
                          process.env.API_SERVER);
    });
  }
};
