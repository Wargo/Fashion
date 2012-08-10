//require('ti.viewshadow');
Ti.App.dataURL = 'http://www.servidordeprueba.net/webs/fashion/';

function myAlert(title, text) {
	var alert = Ti.UI.createAlertDialog({
		title:title,
		message:text,
		ok:L('Ok')
	});
	alert.show();
}
Ti.App.alert = myAlert;

var props = Titanium.App.Properties.listProperties();
for (var c = 0; c < props.length; c ++) {
    var value = Titanium.App.Properties.getString(props[c]);
    //Titanium.API.error(props[c] + " = " + value);
}

if (!Ti.App.Properties.getInt('device')) {
	var device = Math.round(Math.random() * 1000000000);
	Ti.App.Properties.setInt('device', device);
	var register = require('bbdd/register');
	register();
}

Ti.App.currentVote = 0;
var options = require('options');
var showHeader = require('header');
var content = require('content');
var showFooter = require('footer');

var canTap = true;
var voted = false;
var min_age = 13;
var max_age = 80;
Ti.App.result = '';

var win = Ti.UI.createWindow({
	backgroundImage:'images/background.png'
});

Ti.App.countries = [];
var getCountries = require('bbdd/countries');
getCountries();

Ti.App.current = null;
Ti.App.current_photo = null;
var getPhoto = require('bbdd/photo');

var loading = Ti.UI.createActivityIndicator({
	message:L('Cargando nueva imagen'),
	color:'#FFF'
});

var headerConfig = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	height:40,
	top:0,
	zIndex:150,
	opacity:0
});
headerConfig.add(Ti.UI.createLabel({text:L('¿Qué buscas?')}));
win.add(headerConfig);

header = showHeader();
image = content();
footer = showFooter();

getPhoto();

win.open();
