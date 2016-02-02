# CONEMO Android App

This application serves as the patient-facing PhoneGap portion of the NIH funded
CONEMO project.

## Key dependencies

- NodeJS
- NPM (NodeJS Package Manager)
- Cordova 5.4.0

## Installation process

[Download and install NodeJS and the Node Package Manager](http://nodejs.org/download/)

Install the application dependencies

`npm install`

`node_modules/.bin/bower install`

## Running tests

`npm test`

## Building Conemo Phone App

```
LOCALE=es-PE SERVER=http://localhost:3000 npm run build
```

If first time running Cordova,

`node_modules/.bin/cordova platform rm android`
`node_modules/.bin/cordova platform add android`

Subsequent installs only require

```
LOCALE=es-PE SERVER=http://localhost:3000 npm run install:android
```

## Running in the browser

If first time...

```
LOCALE=es-PE SERVER=http://localhost:3000 node_modules/.bin/cordova platform add browser
```

Then build,

```
LOCALE=es-PE SERVER=http://localhost:3000 node_modules/.bin/cordova build browser
```

And finally install (which is all you will need to run on subsequent installs)

```
LOCALE=es-PE SERVER=http://localhost:3000 npm run install:browser
```

While running the app in the browser you may want to clear the database. To do
this run `indexedDB.deleteDatabase('conemo'); localStorage.clear()` in the
browser console.

## Running in an emulator

Make sure you have an SD card enabled so that the video downloads work.

If your computer is on WiFi, disable your LAN (it may be called "Thunderbolt Bridge").
Restart your virtual device and confirm that it has access to the internet.

## Testing locally with mock node server

If you'd like to run the app locally without needing to run the dashboard and
set up a participant, build the app with the mock node server,
`SERVER=http://127.0.01:1337`, as the endpoint. For example:

```
LOCALE=es-PE SERVER=http://127.0.0.1:1337 npm run install:android
```

You will also need to run the mock server.

```
node path/to/conemo_app/test/support/dummy_server.js
```

Now, with a phone tethered to your computer and port forwarding enabled, you
can enter whatever you'd like as the configuration token.
