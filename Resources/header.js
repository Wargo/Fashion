function showHeader() {
	var view = Ti.UI.createView({
		//backgroundColor:'#F2F2F2',
		backgroundColor:'transparent',
		height:45,
		top:-60,
		width:210,
		zIndex:1000,
		borderRadius:5,
		opacity:0.8
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
		eval("var star_" + i + " = Ti.UI.createView({width:40,height:40});");
		var star = eval("star_" + i);
		star.i = i;
		var img = Ti.UI.createImageView({image:'images/star_black.png'});
		star.add(img);
		star._img = img;
		star.addEventListener('singletap', function(e) {
			if (voted) {
				return;
			}
			voted = true;
			if (typeof e.source.i == 'undefined') {
				e.source = e.source.parent;
			}
			for (j = 0; j < 5; j ++) {
				if (j <= e.source.i) {
					eval("star_" + j + "._img.image = 'images/star_yellow.png';");
				} else {
					eval("star_" + j + "._img.image = 'images/star_black.png';");
				}
			}
			Ti.App.currentVote = e.source.i + 1;
			toVote();
		});
		eval("stars._star_" + i + " = star_" + i);
		stars.add(star);
	}
	
	//stars.add(separator);
	
	view._stars = stars;
	//view.add(vote);
	win.add(view);
	
	function toVote() {
		canTap = false;
		var results = require('results');
		results();
		//view.animate({top:-60, delay:500});
	}
	
	return view;
}
module.exports = showHeader;
