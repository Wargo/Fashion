module.exports = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/background.png'
	});

	var header = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		top:0,
		zIndex:1000
	});
	header.add(Ti.UI.createLabel({text:L('title_my_photos')}));
	
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
				top:top,
				left:left,
				_firstLoad:true
			});
			scrollView.add(img);

			img.addEventListener('load', function(e) {
				if (e.source._firstLoad) {
					var thumb = ImageFactory.imageAsThumbnail(e.source.toBlob(), {
						size:90,
						borderSize:5,
						cornerRadius:10,
						quality:ImageFactory.QUALITY_HIGH
					});
					e.source.image = thumb;
					e.source._firstLoad = false;
				}
			});
		}
	}
	
	var getData = require('bbdd/getData');
	getData(getImages);
	
	win.add(header);
	win.add(scrollView);

	return win;

}
