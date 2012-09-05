module.exports = function(num, size) {

	var h = Math.round(size / 5);
	spacing = 4;
	
	var view = Ti.UI.createView({
		width:size,
		height:h,
		layout:'horizontal'
	});
	h = h - 5;
	
	var yellow = Math.floor(num);
	var black = Math.floor(5 - num);
	
	for (j = 0; j < yellow; j ++) {
		view.add(Ti.UI.createImageView({image:'images/star_yellow.png', left:spacing, height:h, width:h}));
	}

	if (yellow + black < 5) {
		var diff = num - yellow;
		if (diff <= 0.33) {
			view.add(Ti.UI.createImageView({image:'images/star1_4.png', left:spacing, height:h, width:h}));
		} else if (diff <= 0.66) {
			view.add(Ti.UI.createImageView({image:'images/star2_4.png', left:spacing, height:h, width:h}));
		} else {
			view.add(Ti.UI.createImageView({image:'images/star3_4.png', left:spacing, height:h, width:h}));
		}
	}

	for (j = 0; j < black; j ++) {
		view.add(Ti.UI.createImageView({image:'images/star_black.png', left:spacing, height:h, width:h}));
	}

	return view;
	
}
