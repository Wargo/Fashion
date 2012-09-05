module.exports = function(num, size) {

	var h = Math.round(num / 4);
	
	var view = Ti.UI.createView({
		width:size,
		height:h,
		layout:'horizontal'
	});
	
	var yellow = Math.floor(num / 5);
	var black = Math.floor((5 - num) / 5);
	
	for (j = 0; j < yellow; j ++) {
		view.add(Ti.UI.createImageView({image:'images/star_yellow.png', left:5, heigh:h}));
	}

	if (yellow + black < 5) {
		var diff = num - yellow;
		if (diff <= 0.33) {
			view.add(Ti.UI.createImageView({image:'images/star1_4.png', left:5, heigh:h}));
		} else if (diff <= 0.66) {
			view.add(Ti.UI.createImageView({image:'images/star2_4.png', left:5, heigh:h}));
		} else {
			view.add(Ti.UI.createImageView({image:'images/star3_4.png', left:5, heigh:h}));
		}
	}

	for (j = 0; j < black; j ++) {
		view.add(Ti.UI.createImageView({image:'images/star_black.png', left:5, heigh:h}));
	}

	return view;
	
}
