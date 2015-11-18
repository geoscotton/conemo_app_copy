# CONEMO Android App

This application serves as the patient-facing PhoneGap portion of the NIH funded
CONEMO project.

## Key dependencies

- NodeJS (v0.10.29)
- NPM (NodeJS Package Manager)
- Bower
- Purple Robot Client
- Cordova 5.4.0
- Purple Robot 1.6.22

## Installation process

[Download and install NodeJS and the Node Package Manager](http://nodejs.org/download/)

Install Bower

`npm install -g bower`

Note: you may have to prepend `sudo` to the previous command, depending on your
environment and permissions

Install the application dependencies

`npm install`

`bower install`

## Running tests

`npm test`

## Linting the application code

`eslint .`

## Building Conemo Phone App

```
npm run build
```

Build this application including code quality review into a distribution copy
from the root of a local clone

`./build_dist.bash`

If there is an error during the grunt build process, install the missing gems.

1. Verify that ruby is installed using ruby -v
1. Update gems using `gem update --system`
1. Possibly install individual gems e.g. `gem install compass`

If first time running cordova,

`./node_modules/.bin/cordova platform rm android`
`./node_modules/.bin/cordova platform add android`

Subsequent builds only requires

`./node_modules/.bin/cordova run android`

## Running in an emulator

Make sure you have an SD card enabled so that the video downloads work.

If your computer is on WiFi, disable your LAN (it may be called "Thunderbolt Bridge").
Restart your virtual device and confirm that it has access to the internet.
