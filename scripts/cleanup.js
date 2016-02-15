module.exports = function(context) {
  var fs = require('fs-extra'),
      configFile = 'config.xml',
      activityFile = 'platforms/android/src/edu/northwestern/cbits/conemo/MainActivity.java';

  if (process.env.API_SERVER) {
    fs.copySync(configFile + '.bak', configFile);
    fs.remove(configFile + '.bak');
  }

  if (process.env.HOCKEY_APP_ID) {
    fs.copySync(activityFile + '.bak', activityFile);
    fs.remove(activityFile + '.bak');
  }
};
