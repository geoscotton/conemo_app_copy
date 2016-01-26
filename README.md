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
