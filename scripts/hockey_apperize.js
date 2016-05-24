module.exports = function(context) {
  var fs = require('fs-extra'),
      filenames = ['platforms/android/src/edu/northwestern/cbits/conemo/MainActivity.java',
                   'platforms/android/AndroidManifest.xml'];

  function replaceStringInFile(filename, toReplace, replaceWith) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(new RegExp(toReplace, "g"), replaceWith);
    fs.writeFileSync(filename, result, 'utf8');
  }

  if (process.env.HOCKEY_APP_ID) {
    filenames.forEach(function(filename) {
      fs.copySync(filename, filename + '.bak');
      replaceStringInFile(filename, 'APP_ID_STRING_TO_REPLACE',
                          process.env.HOCKEY_APP_ID);
    });
  }
};
