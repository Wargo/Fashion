var win = Ti.UI.currentWindow;
win.backgroundImage = 'images/background.png';

var intro = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	borderRadius:5,
	left:10,right:10,top:10,
	height:70
});

intro.add(Ti.UI.createLabel({
	text:L('fill_fields'),
	font:{fontSize:14},
	left:10,right:5,top:5,bottom:5
}));

var fields = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	borderRadius:5,
	left:10,right:10,top:90,
	layout:'vertical',
	height:350
});

var email = Ti.UI.createTextField({
	hintText:L('email_field'),
	left:10,right:10,top:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Ti.UI.KEYBOARD_EMAIL
});

var year = Ti.UI.createTextField({
	enabled:false,
	hintText:L('year_field'),
	left:10,right:10,top:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var country = Ti.UI.createTextField({
	enabled:false,
	hintText:L('country_field'),
	left:10,right:10,top:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var sex = Ti.UI.createTextField({
	enabled:false,
	hintText:L('sex_field'),
	left:10,right:10,top:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
});

var picker = null;
var cancel = Ti.UI.createButton({
	title:L('txt_cancelar'),
	style:Ti.UI.iPhone.SystemButtonStyle.BORDERED
});
var spacer = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var done = Ti.UI.createButton({
	title:L('txt_aceptar'),
	style:Ti.UI.iPhone.SystemButtonStyle.DONE
});
var toolbar = Ti.UI.iOS.createToolbar({
	bottom:215,
	opacity:0,
	items:[cancel,spacer,done],
	zIndex:100
});

cancel.addEventListener('click', function() {
	picker.animate({bottom:-215});
	toolbar.animate({opacity:0});
});

year.addEventListener('click', function() {
	var rows = [];
	var row = Ti.UI.createPickerRow({
		title:''
	});
	rows.push(row);
	for (i = 0; i <= 100; i ++) {
		var row = Ti.UI.createPickerRow({
			title:(2012 - i).toString()
		});
		rows.push(row);
	}
	select(rows, 'year');
});

sex.addEventListener('click', function() {
	var rows = [];
	var row = Ti.UI.createPickerRow({
		title:''
	});
	rows.push(row);
	
	var row = Ti.UI.createPickerRow({
		title:L('txt_chico')
	});
	row.id = 0;
	rows.push(row);
	
	var row = Ti.UI.createPickerRow({
		title:L('txt_chica')
	});
	row.id = 1;
	rows.push(row);
	
	select(rows, 'sex');
});

country.addEventListener('click', function() {
	var rows = [];
	var row = Ti.UI.createPickerRow({
		title:''
	});
	rows.push(row);
	for (i in Ti.App.countries) {
		if (i == 0) continue;
		var row = Ti.UI.createPickerRow({
			title:Ti.App.countries[i].name
		});
		row.id = Ti.App.countries[i].id;
		rows.push(row);
	}
	select(rows, 'country');
});

done.addEventListener('click', function() {
	year.value = currentYearValue;
	sex.value = currentSexValue;
	country.value = currentCountryValue;
	picker.animate({bottom:-215});
	toolbar.animate({opacity:0});
});

fields.add(year);
fields.add(sex);
fields.add(country);
fields.add(email);

var previewView = Ti.UI.createView({
	width:80,
	height:80,
	borderRadius:0,
	top:20
});
var preview = Ti.UI.createImageView({
	image:win.e.media,
});
previewView.add(preview);

var next_step = Ti.UI.createButton({
	title:L('txt_continuar'),
	right:20
});
var cancel = Ti.UI.createButton({
	title:L('txt_cancelar'),
	left:20
});

var buttons = Ti.UI.createView({
	top:10
});

next_step.addEventListener('click', function() {
	if (year.value && sex.value && country.value && email.value) {
		var registering = require('bbdd/register');
		registering(email.value, currentSexId, currentCountryId, currentYearId);
		var uploading = require('uploading');
		uploading(win, win.e, true);
	} else {
		Ti.App.alert(L('txt_error'), L('error_fields'));
	}
});
cancel.addEventListener('click', function() {
	win.close({left:400});
});

buttons.add(cancel);
buttons.add(next_step);

fields.add(previewView);
fields.add(buttons);

win.add(intro);
win.add(fields);

var currentYearValue = null;
var currentSexValue = null;
var currentCountryValue = null;

function select(rows, currentValue) {
	email.blur();
	if (picker) {
		toolbar.opacity = 0;
		win.remove(picker);
		win.remove(toolbar);
	}
	
	picker = Ti.UI.createPicker({
		bottom:-215,
		selectionIndicator:true,
		zIndex:100
	});
	picker.addEventListener('change', function(e) {
		switch(currentValue) {
			case 'year':
				currentYearValue = e.selectedValue.toString();
				currentYearId = e.selectedValue.toString();
				break;
			case 'sex':
				currentSexValue = e.selectedValue.toString();
				currentSexId = e.row.id;
				break;
			case 'country':
				currentCountryValue = e.selectedValue.toString();
				currentCountryId = e.row.id;
				break;
		}
	});

	picker.add(rows);
	win.add(picker);
	win.add(toolbar);
	
	picker.animate({bottom:0});
	toolbar.animate({opacity:1});
}
