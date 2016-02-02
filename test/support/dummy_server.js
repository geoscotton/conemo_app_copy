'use strict';

function mockStatus(req) {
  return {
    OPTIONS: 200,
    POST: 201,
    GET: 200
  }[req.method];
}

function mockData(req) {
  return {
    '/api/authentication_tokens': {
      data: {
        type: 'authenticationTokens',
        id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
        value: 'this_is_an_authentication_token'
      }
    }
  }[req.url];
}

var http = require('http');

http.createServer(function (req, res) {
  req.on('data', function(data) {
    console.log('body: ' + data);
  });
  console.log('method: ' + req.method);
  console.log('headers: ' + JSON.stringify(req.headers));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.writeHead(mockStatus(req), {'Content-Type': 'application/json'});

  res.end(JSON.stringify(mockData(req)));
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
