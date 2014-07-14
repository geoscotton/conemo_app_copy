conemo_app
==========

This application serves as the patient-facing PhoneGap portion of the NIH funded CONEMO project.

Key dependencies:
-----------------
- NodeJS (v0.10.29)
- NPM (NodeJS Package Manager)
- Bower
- Grunt
- Yeoman
- Yeoman Angular Generator
- Purple Robot Client

Installation process:
---------------------

[Download and install NodeJS and the Node Package Manager](http://nodejs.org/download/)

Install Yeoman, Grunt Commmand Line Interface, and Bower

`npm install -g yo grunt-cli bower`

Install the Yeoman Angular Generator tools

`npm install -g generator-angular`

Note: you may have to prepend `sudo` to the previous two commands, depending on your environment and permissions

Install the application dependencies

`npm install`

`bower install`

Serve this application using the built-in Grunt server from the root of a local clone

`grunt serve`

OR

Build this application including code quality review into a distribution copy from the root of a local clone

`grunt`

Add Purple Robot Client to Dependencies
---------------------------------------

Add `"PurpleRobotClient": "git@github.com:cbitstech/PurpleRobotClient.git#1.5.10.0"` as a bower dependency in bower.json.

Run `bower install`.


Running tests
-------------
`grunt test`


Running protractor tests
------------------------

Set up a standalone selenium server using instructions found at:
https://github.com/angular/protractor

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

1. Navigate to app folder and run `bash build_dist.bash` in the command line.

2. This will copy the most recent lesson.json from the CONEMO api and copy it over to the www folder (effectively, the build folder for cordova). Grunt build will also run, minifying and copying necessary files over to the www folder.

3. From the command line, run

`cordova run android`

4. This will both build and run the app on an emulator or a phone you have plugged in. 

5. Once you have verified that the app is running, you can grab the apk file in the directory
`APPNAME/platforms/android/ant-build`



Still need help?
----------

[An example tutorial](http://www.sitepoint.com/kickstart-your-angularjs-development-with-yeoman-grunt-and-bower/)



