module.exports = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/background.png'
	});
	
	var scrollView = Ti.UI.createScrollView({
		showVerticalScrollIndicator:true,
		contentHeight:'auto',
		top:40
	});
	
	var loading = Ti.UI.createActivityIndicator();
	win.add(loading);
	loading.show();
	
	function getImages(data) {
		if (data === null) {
			win.close();
		}
		loading.hide();
		var top = 10;
		for (i in data) {
			var left = 10 + (i % 3) * 100;
			if (i % 3 === 0 && i != 0) {
				top += 100;
			}
			var img = Ti.UI.createImageView({
				image: data[i].thumb,
				width:90,
				height:90,
				top:top,
				left:left
			});
			scrollView.add(img);
		}
	}
	
	var getData = require('bbdd/getData');
	getData(getImages);
	
	win.add(scrollView);

	return win;

}
