function content() {
	var marginW = 30;
	var marginH = 50;
	var tapped = false;
	
	var image = Ti.UI.createImageView({
		right:marginW,left:marginW,top:marginH,bottom:marginH,
		//image:Ti.App.current_photo,
		preventDefaultImage:true,
		zIndex:2
	});
	var shadow = Ti.UI.createImageView({
		image:'images/shadow.png',
		right:marginW-13,left:marginW-7,top:marginH-3,bottom:marginH-10,
		zIndex:1
	});
	
	image.addEventListener('load', function() {
		header.animate({top:0, delay:500});
		loading.hide();
		scrollView.add(shadow);
	});
	var scrollView = Ti.UI.createScrollView({
		maxZoomScale: 1, // 10
		minZoomScale: 1,
		width:320
	});
	
	scrollView.add(image);
	scrollView.add(loading);
	
	loading.show();
	
	image.addEventListener('singletap', function(e) {
		if (canTap) {
			if (tapped == false) {
				shadow.opacity = 0;
				scrollView.maxZoomScale = 10;
				tapped = true;
				header.animate({top:-60});
				footer.animate({bottom:-40});
				scrollView.animate({backgroundColor:'#000'});
				e.source.animate({top:0,left:0,bottom:0,right:0});
			} else {
				shadow.opacity = 1;
				scrollView.maxZoomScale = 1;
				scrollView.zoomScale = 1;
				tapped = false;
				header.animate({top:0});
				footer.animate({bottom:0});
				scrollView.animate({backgroundColor:'transparent'});
				e.source.animate({left:marginW,right:marginW,top:marginH,bottom:marginH});
			}
		}
	});
	
	image._scrollView = scrollView;
	image._shadow = shadow;
	
	win.add(scrollView);
	
	return image;
}
module.exports = content;