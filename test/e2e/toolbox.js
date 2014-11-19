'use strict';
var loginHelper = require('./spec_helper.js').loginHelper;

var ToolboxPage = function() {
  this.lessonList = element.all(by.repeater('lesson in availableLessons'));
  this.unreadLabel = element(by.binding('unreadLabel'));
  this.unreadLessonLink = element.all(by.css('.beginLesson'));
  this.get = function() {
    browser.get('http://localhost:9000/#/toolbox');
  };
};

describe('Toolbox Page', function() {
  var toolboxPage = new ToolboxPage();
  var ptor;

  beforeEach(function() {
    toolboxPage.get();
    ptor = protractor.getInstance();
  });

  it('should not display unread label after lesson is read', function() {

  	console.log(toolboxPage.unreadLessonLink);
  	browser.sleep(2500);
  	ptor.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function () {
    	var homeButton = element(by.id('complete'));
    	homeButton.click();
    });

	});
});
