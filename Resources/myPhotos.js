module.exports = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/background.png',
		left:400
	});

	var backButton = Ti.UI.createView({
		width:50,
		height:40,
		left:0
	});
	backButton.add(Ti.UI.createImageView({image:'images/back.png'}));
	backButton.addEventListener('click', function() {
		win.close({left:400});
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
			win.close({left:400});
		}
		var top = 10;
		for (i in data) {
			var left = 10 + (i % 3) * 100;
			if (i % 3 === 0 && i != 0) {
				top += 140;
			}
			var smallView = Ti.UI.createView({
				top:top,
				left:left,
				width:90,
				height:130
			});

			var smallLoading = Ti.UI.createActivityIndicator();
			smallLoading.show();

			var img = Ti.UI.createImageView({
				top:0,
				image: data[i].thumb,
				opacity:0,
				_firstLoad:true,
				_smallLoading:smallLoading
			});

			img.addEventListener('load', function(e) {
				loading.hide(); // lo oculto aquí porque si lo hago antes se queda mucho rato sin loading
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

			var rating = require('stars');
			var stars = rating(data[i].rating, 90);
			stars.top = 95;

			smallView.add(smallLoading);
			smallView.add(img);
			smallView.add(stars);
			//smallView.add(Ti.UI.createLabel({text:data[i].rating, top:90, font:{fontSize:12}}));
			if (data[i].num != 1) {
				var num_votes = String.format(L('num_votes'), data[i].num);
			} else {
				var num_votes = String.format(L('num_vote'), 1);
			}
			smallView.add(Ti.UI.createLabel({text:num_votes, top:115, font:{fontSize:12}}));
			scrollView.add(smallView);
		}
		scrollView.add(Ti.UI.createView({height:15, top:top + 140})); // Espacio al final del scrollview
		win.add(scrollView);
	}
	
	var getData = require('bbdd/getData');
	getData(getImages);
	
	win.add(header);

	return win;

}
