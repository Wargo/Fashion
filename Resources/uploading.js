function uploading(win, e, register) {
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		borderRadius:5,
		borderWidth:5,
		borderColor:'#4F1722',
		left:5,right:5,bottom:5,top:5,
		layout:'vertical',
		zIndex:250
	});
	
	var photoView = Ti.UI.createView({
		width:250,
		height:250,
		borderRadius:0,
		top:15
	});
	
	var photo = Ti.UI.createImageView({
		image:e.media,
	});
	
	photoView.add(photo);
	
	var upload = Ti.UI.createButton({
		title:L('Subir foto'),
		top:30
	});
	
	view.add(photoView);
	view.add(upload);
	
	upload.addEventListener('click', function() {
		upload.enabled = false;
		var uploadImage = require('bbdd/uploadImage');
		uploadImage(e, view, register);
	});
	
	view.animate({opacity:1});
	win.add(view);
}
module.exports = uploading;