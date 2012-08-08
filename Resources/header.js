function showHeader() {
	var voted = false;
	
	var view = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		top:0,
		zIndex:100
	});
	
	var stars = Ti.UI.createView({
		layout:'horizontal',
		left:10,
		height:40
	});
	
	view.add(stars);
	
	for (i = 0; i < 5; i ++) {
		//eval("var star_" + i + " = Ti.UI.createImageView({image:'images/star_off.png', left:5});");
		eval("var star_" + i + " = Ti.UI.createView({width:30,height:40});");
		var star = eval("star_" + i);
		star.i = i;
		var img = Ti.UI.createImageView({image:'images/star_off.png'});
		star.add(img);
		star._img = img;
		star.addEventListener('singletap', function(e) {
			voted = true;
			if (typeof e.source.i == 'undefined') {
				e.source = e.source.parent;
			}
			for (j = 0; j < 5; j ++) {
				if (j <= e.source.i) {
					eval("star_" + j + "._img.image = 'images/star_on.png';");
				} else {
					eval("star_" + j + "._img.image = 'images/star_off.png';");
				}
			}
		});
		stars.add(star);
	}
	
	var label = Ti.UI.createLabel({
		text:L('Vótame'),
		right:20,
		height:40
	});
	
	label.addEventListener('singletap', function() {
		if (voted) {
			random = Math.round(Math.random() * (images.length - 1));
			image.image = images[random].image;
			for (j = 0; j < 5; j ++) {
				eval("star_" + j + "._img.image = 'images/star_off.png';");
			}
			voted = false;
		} else {
			var alert = Ti.UI.createAlertDialog({
				title:L('Error'),
				message:L('Debes seleccionar el número de estrellas'),
				ok:L('Ok')
			});
			alert.show();
		}
	});
	
	view.add(label);
	win.add(view);
	
	return view;
}
module.exports = showHeader;
