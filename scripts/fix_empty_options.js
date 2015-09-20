#!/usr/bin/env node

var fs = require('fs'),
    lessonsFile = 'app/scripts/lessons.json';

fs.readFile(lessonsFile, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/\\u003coption\\u003e\\u003c\/option\\u003e/g, "");

  fs.writeFile(lessonsFile, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
