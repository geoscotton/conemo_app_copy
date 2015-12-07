# CONEMO Android App

This application serves as the patient-facing PhoneGap portion of the NIH funded
CONEMO project.

## Key dependencies

- NodeJS
- NPM (NodeJS Package Manager)
- Purple Robot Client
- Cordova 5.4.0
- Purple Robot 1.6.22

## Installation process

[Download and install NodeJS and the Node Package Manager](http://nodejs.org/download/)

Install the application dependencies

`npm install`

`./node_modules/.bin/bower install`

## Running tests

`npm test`

## Building Conemo Phone App

```
npm run build
```

If first time running cordova,

`./node_modules/.bin/cordova platform rm android`
`./node_modules/.bin/cordova platform add android`

Subsequent builds only requires

`./node_modules/.bin/cordova run android`

## Running in an emulator

Make sure you have an SD card enabled so that the video downloads work.

If your computer is on WiFi, disable your LAN (it may be called "Thunderbolt Bridge").
Restart your virtual device and confirm that it has access to the internet.
