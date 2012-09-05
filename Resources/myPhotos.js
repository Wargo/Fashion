module.exports = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/background.png',
		top:-480
	});

	var backButton = Ti.UI.createView({
		width:50,
		height:40,
		left:0
	});
	backButton.add(Ti.UI.createImageView({image:'images/back.png'}));
	backButton.addEventListener('click', function() {
		win.close({top:-480});
	});

	var header = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		top:0,
		zIndex:1000
	});
	header.add(Ti.UI.createLabel({text:L('title_my_photos')}));
	header.add(backButton);
	
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
			win.close({top:-480});
		}
		var top = 10;
		for (i in data) {
			var left = 10 + (i % 3) * 100;
			if (i % 3 === 0 && i != 0) {
				top += 100;
			}
			var smallView = Ti.UI.createView({
				top:top,
				left:left,
				width:90,
				height:150
			});

			var smallLoading = Ti.UI.createActivityIndicator();
			smallLoading.show();

			var img = Ti.UI.createImageView({
				image: data[i].thumb,
				opacity:0,
				_firstLoad:true,
				_smallLoading:smallLoading
			});

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
				} else {
					e.source.animate({opacity:1});
					e.source._smallLoading.hide();
				}
			});

			smallview.add(smallLoading);
			smallView.add(img);
			smallView.add(Ti.UI.createLabel({text:data[i].rating, top:100}));
			smallView.add(Ti.UI.createLabel({text:data[i].num, top:125}));
			scrollView.add(smallView);
		}
		loading.hide();
	}
	
	var getData = require('bbdd/getData');
	getData(getImages);
	
	win.add(header);
	win.add(scrollView);

	return win;

}
