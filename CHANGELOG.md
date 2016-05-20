# Changelog

## 1.3.17 - 2016-05-20

* ensure body class is reset on route updates

## 1.3.16 - 2016-05-20

* update content and add Portuguese video

## 1.3.15 - 2016-05-19

* update feedback slide colors
* update lesson content

## 1.3.14 - 2016-05-18

* add context-dependent slide colors

## 1.3.13 - 2016-05-18

* update translations

## 1.3.12 - 2016-05-10

* add follow up page to activity planning
* go back in the browser history on back event

## 1.3.11 - 2016-05-05

* resize text on home screen (main page)
* update lesson content
* change slide colors for activity planning/review
* use Bootstrap JS radio buttons for better UI
* resize font for activity/review selects
* save empty string for unselected activity ratings
* center activity planning/reviewing content

## 1.3.10 - 2016-04-13

* update lesson content
* use 1 as default day in study instead of 0

## 1.3.9 - 2016-04-07

* resize lesson titles for Spanish version

## 1.3.8 - 2016-04-07

* update lesson content
* resize lesson titles for Spanish version

## 1.3.7 - 2016-04-04

* fix content size for Spanish activity not done
* force Main page reload on resume

## 1.3.6 - 2016-04-04

* notify Angular of URL update rather than reloading
* apply minor style updates to activity fonts
* remove extraneous HTML from lesson slide

## 1.3.5 - 2016-03-31

* ensure videos pause on navigation
* always return to the main page on resume
* disable form inputs after saving data
* ensure videos pause on navigation
* increase Spanish version slide font size
* reduce lesson page count font size
* update lesson content
* schedule notifications based on start date

## 1.3.4 - 2016-03-25

* add blank prompt to slide form select inputs
* fix slide form input data capture
* fix data capture of activity planning and feedback
* scheduled activity feedback relative to "now"

## 1.3.3 - 2016-03-24

* update lesson content
* capture all slide form input values
* fix off-by-1 errors in slide display
* ensure unread label updates on main page

## 1.3.2 - 2016-03-23

* add lame fix for broken video functionality

## 1.3.1 - 2016-03-22

* update Portuguese lesson content
* save form on penultimate slide
* remove scrollable slide transitions
* update Spanish feedback text
* add hidden blank to activity selects

## 1.3.0 - 2016-03-21

* use Resources instead of localStorage for lessons
* use start date in Resources, not localStorage
* use global variable for 'l10n'
* remvoe unused network connection plugin and code

## 1.2.3 - 2016-03-17

* update Protuguese lesson content
* remove duplicate feedback

## 1.2.2 - 2016-03-11

* include feedback follow up ratings questions

## 1.2.1 - 2016-03-10

* style activity planning radio inputs
* make font size consistent in Portuguese app

## 1.2.0 - 2016-03-10

* update lesson content
* lock to portrait orientation
* enable customized content for activity planning
* change multi-select to checkboxes

## 1.1.9 - 2016-03-06

* translate config page
* add black background to videos
* update SP instructions
* change PT Session 2 slide 5 to be multiple choice
* remove auto numbered lesson headers
* move home button on instructions page
* add activity options
* update instructions for accuracy

## 1.1.8 - 2016-03-02

* remove training session
* change timestamp column names
* update lesson content
* fix help text PT
* add PT updated instructions
* display app version on instructions page

## 1.1.7 - 2016-02-26

* update ES content; remove ES specific CSS styles

## 1.1.6 - 2016-02-21

* update with latest lesson content
* add app version to logins data
* catch and report JS exceptions
* increase sync period to 2 minutes
* ensure lesson nav is rendered

## 1.1.5 - 2016-02-16

* fix pt-BR videos for sessions 15 and 18

## 1.1.4 - 2016-02-15

* enable crash reports to HockeyApp
* update lesson content
* update Portuguese videos
* update crosswalk and local-notification versions

## 1.1.3 - 2016-02-10

* update Cordova to v6.0.0
* install Crosswalk v16 to support Android 4.x

## 1.1.2 - 2016-02-08

* ensure session select inputs have blank option
* remove "do you want help..." q&a
* capture responses to session form inputs

## 1.1.1 - 2016-02-06

* update Lesson content
* prevent unnecessary page reload stutter
* refactoring and code cleanup
* complete activity plan/review feature in English
* fix occasional failure of lesson/session slides
* allow for building with separate server and lesson targets

## 1.1.0 - 2016-02-02

* enable background mode for data transmission
* update help contact text
* schedule lesson notifications once
* enable activity planning and reviewing
* prevent memory leak in LessonController
* avoid exceptions on lessons without videos
* sync logins
* capture and sync lesson access events
* sync start dates
* sync help messages
* complete more robust token config workflow
* remove Crosswalk due to app crashes
* remove Purple Robot specific code

## 1.0.2 - 2015-12-17

* enable session (lesson) notifications without PR

## 1.0.0 - 2015-12-11

* enable localized video build process
* remove all but one help request type
* add timestamp to config for confirmation
* remove locale selection and video download
* add locale config parameter to build step
* update Cordova version to 5.4.1
* embed videos in application
* integrate Crosswalk plugin

## 0.3.7 - 2015-09-22

* update content

## 0.3.6 - 2015-09-21

* replace video controls with simple play/pause icon

## 0.3.4 - 2015-09-19

* make training lesson date/time inputs like lessons
* add unselectable default blank option to selects

## 0.3.1 - 2015-09-08

* extend lesson notification repeat period
* remove blank options in lessons

## 0.3.0 - 2015-09-04

* capture session access events and emit with PR
* add PR debug logging to staging server
* remove blank select option
* update Spanish sample lesson

## 0.2.0 - 2015-07-22

* clean up large amounts of code
* update lessons and dialogs content
* move sample lesson to be accessible from main page
