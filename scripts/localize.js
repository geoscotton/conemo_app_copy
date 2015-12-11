module.exports = function(context) {
  var fs = require('fs'),
      filename = 'app/scripts/app.js';

  function replaceStringInFile(filename, toReplace, replaceWith) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(new RegExp(toReplace, "g"), replaceWith);
    fs.writeFileSync(filename, result, 'utf8');
  }

  if (process.env.LOCALE) {
    replaceStringInFile(
      filename,
      "/\\* REPLACE \\*/ var l10n = 'pt-BR'; /\\* REPLACE \\*/",
      "/* REPLACE */ var l10n = '" + process.env.LOCALE + "'; /* REPLACE */"
    );
  }
};
