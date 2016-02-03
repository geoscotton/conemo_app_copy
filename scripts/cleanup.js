module.exports = function(context) {
  var fs = require('fs-extra');

  if (process.env.API_SERVER) {
    fs.copySync('config.xml.bak', 'config.xml');
    fs.remove('config.xml.bak');
  }
};
