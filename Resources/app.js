var showHeader = require('header');
var content = require('content');
var showFooter = require('footer');

var win = Ti.UI.createWindow({
	backgroundImage:'images/background.png'
});

header = showHeader();
content();
footer = showFooter();

win.open();
