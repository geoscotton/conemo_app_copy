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

Copy bower components for the web-view.

    cp -r bower* app/

Serve this application using the built-in Grunt server from the app folder to work on the webview.
	cd app
    grunt serve


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

Build this application including code quality review into a distribution copy from the root of a local clone

`bash build_dist.bash`

If first time running cordova, 

`cordova platform rm android`
`cordova platform add android`

Subsequent builds only requires

`cordova run android`


Still need help?
----------

[An example tutorial](http://www.sitepoint.com/kickstart-your-angularjs-development-with-yeoman-grunt-and-bower/)



