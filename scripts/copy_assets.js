module.exports = function(context) {
  // This hook copies various resource files
  // from our version control system directories
  // into the appropriate location.
  var filesToCopy = [
    {
      "app/index.html": "www/index.html"
    },
    {
      "app/icon.png": "www/icon.png"
    },
    {
      "app/pause.png": "www/pause.png"
    },
    {
      "app/play.png": "www/play.png"
    },
    {
      "bower_components/bootstrap/dist/css/bootstrap.min.css":
        "www/vendor/bootstrap.min.css"
    },
    {
      "bower_components/bootstrap/dist/js/bootstrap.min.js":
        "www/vendor/bootstrap.min.js"
    },
    {
      "bower_components/lodash/lodash.min.js":
        "www/vendor/lodash.min.js"
    },
    {
      "bower_components/PurpleRobotClient/purple-robot.min.js":
        "www/vendor/purple-robot.min.js"
    },
    {
      "node_modules/angular/angular.min.js":
        "www/vendor/angular.min.js"
    },
    {
      "node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js":
        "www/vendor/tmhDynamicLocale.min.js"
    },
    {
      "node_modules/angular-resource/angular-resource.min.js":
        "www/vendor/angular-resource.min.js"
    },
    {
      "node_modules/angular-route/angular-route.min.js":
        "www/vendor/angular-route.min.js"
    },
    {
      "node_modules/angular-sanitize/angular-sanitize.min.js":
        "www/vendor/angular-sanitize.min.js"
    },
    {
      "node_modules/cache_and_sync_love/dist/cache_and_sync_love.min.js":
        "www/vendor/cache_and_sync_love.min.js"
    },
    {
      "node_modules/jquery/dist/jquery.min.js":
        "www/vendor/jquery.min.js"
    },
    {
      "node_modules/lovefield/dist/lovefield.min.js":
        "www/vendor/lovefield.min.js"
    },
    {
      "node_modules/moment/min/moment.min.js":
        "www/vendor/moment.min.js"
    },
    {
      "video/countdown.mp4": "www/videos/countdown.mp4"
    }
  ];

  var fs = require('fs-extra'),
      path = require('path'),
      rootDir = context.opts.projectRoot;

  filesToCopy.forEach(function(fileMap) {
    Object.keys(fileMap).forEach(function(srcPath) {
      var destPath = fileMap[srcPath],
          srcFile = path.join(rootDir, srcPath);
      var destFile = path.join(rootDir, destPath);
      var destDir = path.dirname(destFile);

      if (fs.existsSync(srcFile)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir);
        }

        fs.copySync(srcFile, destFile);
      }
    });
  });

  var localizedVideos = {};
  localizedVideos[("video/" + process.env.LOCALE)] = "www/videos";
  var directoriesToCopy = [
    { "app/fonts": "www/fonts" },
    { "app/images": "www/images" },
    { "app/scripts": "www/scripts" },
    { "app/styles": "www/styles" },
    localizedVideos,
    { "app/views": "www/views" }
  ];

  directoriesToCopy.forEach(function(directoryMap) {
    Object.keys(directoryMap).forEach(function(srcDirectory) {
      var destDirectory = directoryMap[srcDirectory];

      fs.copySync(srcDirectory, destDirectory);
    });
  });
}
