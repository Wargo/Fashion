function uploading(win, e, register) {
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		borderRadius:5,
		borderWidth:5,
		borderColor:'#4F1722',
		left:5,right:5,bottom:5,top:5,
		//layout:'vertical',
		zIndex:2500
	});
	
	var photoView = Ti.UI.createView({
		width:250,
		height:250,
		borderRadius:0,
		top:15
	});
	
	var photo = Ti.UI.createImageView({
		image:e.media
	});
	
	photoView.add(photo);
	
	var upload = Ti.UI.createButton({
		title:L('upload'),
		top:300,
		right:40
	});
	var cancel = Ti.UI.createButton({
		title:L('txt_cancelar'),
		top:300,
		left:40
	});
	view.add(photoView);
	view.add(upload);
	view.add(cancel);
	
	var uploadImage = require('bbdd/uploadImage');
	
	upload.addEventListener('click', function() {
		upload.enabled = false;
		uploadImage(e, view, register);
		//uploadImage(photo.getImage(), view, register);
	});
	
	cancel.addEventListener('click', function() {
		if (register) {
			win.close({right:400});
		} else {
			view.animate({opacity:0});
		}
	});
	
	view.animate({opacity:1});
	win.add(view);
}
module.exports = uploading;
