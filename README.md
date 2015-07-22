conemo_app
==========

This application serves as the patient-facing PhoneGap portion of the NIH funded
CONEMO project.

Key dependencies
----------------

- NodeJS (v0.10.29)
- NPM (NodeJS Package Manager)
- Bower
- Grunt
- Yeoman
- Yeoman Angular Generator
- Purple Robot Client
- Cordova 4.1.2
- Purple Robot 1.5.23b

Installation process
--------------------

[Download and install NodeJS and the Node Package Manager](http://nodejs.org/download/)

Install Yeoman, Grunt Commmand Line Interface, and Bower

`npm install -g yo grunt-cli bower`

Install the Yeoman Angular Generator tools

`npm install -g generator-angular`

Note: you may have to prepend `sudo` to the previous two commands, depending on your
environment and permissions

Install the application dependencies

`npm install`

`bower install`

Copy bower components for the web-view.

```
cp -r bower* app/
```

Serve this application using the built-in Grunt server from the app folder to work
on the webview.

```
cd app
grunt serve
```

Running tests
-------------

`grunt test`

Running protractor tests
------------------------

Set up a standalone selenium server using instructions found at:
[Protractor](https://github.com/angular/protractor)

`npm install -g protractor`
`webdriver-manager`
`webdriver-manager update`

To run E2E tests,

Start selenium server using:
`webdriver-manager start`

Run protractor tests using:
`protractor protractor.conf.js`

Linting the application code
----------------------------

`jshint .`

Building Conemo Phone App
----------------------------

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

Running in an emulator
----------------------

Make sure you have an SD card enabled so that the video downloads work.

If your computer is on WiFi, disable your LAN (it may be called "Thunderbolt Bridge").
Restart your virtual device and confirm that it has access to the internet.

If you still need help
----------------------

[An example tutorial](http://www.sitepoint.com/kickstart-your-angularjs-development-with-yeoman-grunt-and-bower/)
