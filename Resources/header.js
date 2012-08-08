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
		left:5,
		height:40
	});
	
	view.add(stars);
	
	var separator = Ti.UI.createView({
		width:1,
		backgroundColor:'#BFB8B2',
		left:10
	});
	
	for (i = 0; i < 5; i ++) {
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
		eval("stars._star_" + i + " = star_" + i);
		stars.add(star);
	}
	
	stars.add(separator);
	
	var vote = Ti.UI.createButton({
		title:L('Vótame'),
		right:20
	});
	
	vote.addEventListener('singletap', function() {
		if (voted) {
			var results = require('results');
			results();
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
	
	view._stars = stars;
	view.add(vote);
	win.add(view);
	
	return view;
}
module.exports = showHeader;
