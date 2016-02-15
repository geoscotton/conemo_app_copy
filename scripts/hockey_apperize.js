module.exports = function(context) {
  var fs = require('fs-extra'),
      filename = 'platforms/android/src/edu/northwestern/cbits/conemo/MainActivity.java';

  function replaceStringInFile(filename, toReplace, replaceWith) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(new RegExp(toReplace, "g"), replaceWith);
    fs.writeFileSync(filename, result, 'utf8');
  }

  if (process.env.HOCKEY_APP_ID) {
    fs.copySync(filename, filename + '.bak');
    replaceStringInFile(filename, 'APP_ID_STRING_TO_REPLACE',
                        process.env.HOCKEY_APP_ID);
  }
};
