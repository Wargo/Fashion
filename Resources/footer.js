function showFooter() {
	var optionsView = null;
	var view = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		bottom:0,
		zIndex:1000
	});
	var tools = Ti.UI.createView({
		height:40,
		width:50,
		left:0
	});
	tools.add(Ti.UI.createImageView({image:'images/tools_dark.png'}));
	
	var ok = Ti.UI.createView({height:40,width:50,left:0,opacity:0});
	ok.add(Ti.UI.createLabel({text:L('ok')}));
	
	tools.addEventListener('singletap', function() {
		//alert('Deshabilitado temporalmente...');
		optionsView = options(optionsView, tools, ok);
	});
	ok.addEventListener('singletap', function() {
		optionsView = options(optionsView, tools, ok);
	});

	var takePhoto = Ti.UI.createView({
		height:40,
		//width:50,
		right:0,
		borderWidth:1,
		borderColor:'#333',
		layout:'horizontal'
	});
	takePhoto.add(Ti.UI.createImageView({left:10, image:'images/camera.png'}));	
	takePhoto.add(Ti.UI.createLabel({left:10, color:'#333', text:L('take_photo')}));
	takePhoto.addEventListener('singletap', function() {
		var dialog = Ti.UI.createOptionDialog({
			title: L('txt_get_image'),
			options: [L('txt_camara'), L('txt_galeria'), L('txt_cancelar')],
			cancel:2
		});
		dialog.show();
		
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				camera();
			} else if (e.index == 1) {
				gallery();
			}
		});
	});
	
	var menu = Ti.UI.createView({
		height:40,
		width:100,
		right:0
	});
	menu.add(Ti.UI.createLabel({text:L('menu')}));
	menu.addEventListener('click', function(e) {
		var submenu = Ti.UI.createView({
			right:0,
			width:150,
			height:250,
			bottom:-300,
			backgroundColor:'#F2F2F2',
			zIndex:100,
			layout:'vertical'
		});
		submenu.add(takePhoto);
		win.add(submenu);
		submenu.animate({bottom:40});
	});
	
	var separator = Ti.UI.createView({
		width:1,
		backgroundColor:'#BFB8B2',
		left:50
	});
	var separator2 = Ti.UI.createView({
		width:1,
		backgroundColor:'#BFB8B2',
		right:100
	});
	
	view.add(separator);
	view.add(tools);
	view.add(ok);
	view.add(separator2);
	//view.add(takePhoto);
	view.add(menu);
	
	win.add(view);
	
	view._tools = tools;
	view._ok = ok;
	
	function gallery() {
		Ti.Media.openPhotoGallery({
			mediaType:[Ti.Media.MEDIA_TYPE_PHOTO],
			success: function(e) {
				success(e);
			},
			cancel: function() {
				
			},
			error: function(e) {
				var error = Ti.UI.createAlertDialog({
					ok:L('ok'),
					title:L('txt_error'),
					message:L('gallery_error')
				});
				error.show();
			},
			allowEditing:false
		})
	}
	
	function camera() {
		Ti.Media.showCamera({
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
			success: function(e) {
				success(e);
			},
			cancel: function() {
				
			},
			error: function(e) {
				var error = Ti.UI.createAlertDialog({
					ok:L('ok'),
					title:L('txt_error'),
					message:L('camera_error')
				});
				error.show();
			},
			allowEditing:false,
			saveToPhotoGallery:true
		});
	}
	
	function success(e) {
		if (Ti.App.Properties.getBool('registered')) {
			var uploading = require('uploading');
			uploading(win, e, false);
		} else {
			var register = Ti.UI.createWindow({url:'register.js'});
			register.e = e;
			register.left = 400;
			register.open({left:0});
		}
	}
	
	return view;
}
module.exports = showFooter;
