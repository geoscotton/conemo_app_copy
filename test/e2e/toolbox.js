'use strict';
var loginHelper = require('./spec_helper.js').loginHelper;

var ToolboxPage = function() {
  this.lessonList = element.all(by.repeater('lesson in availableLessons'));
  this.unreadLabel = element(by.binding('unreadLabel'));
  this.unreadLessonLink = element(by.binding('beginLessonButtonLabel'));
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

  	toolboxPage.unreadLessonLink.click();
  	browser.sleep(1500);
  	ptor.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function () {
    	var homeButton = element(by.id('complete'));
    	homeButton.click();
	});

	// use login helper spec if user has not logged in
	// loginHelper('Furby','pt-BR');

  	var toolboxButton = element(by.binding("'toolBoxLabel' | translate"));
  	toolboxButton.click();
  	expect(toolboxPage.unreadLabel.isDisplayed())
  		.toBe(false);
  	});


});
