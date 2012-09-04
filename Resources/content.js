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

	image.image = ImageFactory.imageAsResized(image.image, {
		width:200, height:350, quality:ImageFactory.QUALITY_HIGH, hires:true
	});
	
	var scrollView = Ti.UI.createScrollView({
		maxZoomScale: 1, // 10
		minZoomScale: 1,
		width:320
	});
	
	image.addEventListener('load', function() {
		header.animate({top:0, delay:500});
		loading.hide();
		//scrollView.add(shadow);
		canTap = true;
		image.setShadow({
			//shadowRadius:5,
			//shadowOpacity:0.5,
			//shadowOffset:{x:8, y:8}
		});
	});

	scrollView.add(image);
	scrollView.add(loading);
	
	loading.show();
	
	var message = Ti.UI.createImageView({
		image:'images/help.png',
		top:40,
		zIndex:200,
		opacity:0
	});
	win.add(message);
	message.add(Ti.UI.createLabel({top:25,font:{fontSize:13},text:L('swipe_text'), color:'#FFF'}));
	var appear = Ti.UI.createAnimation({opacity:0.7, delay:1000});
	appear.addEventListener('complete', function() {
		message.animate({opacity:0, delay:3000});
	});
	
	image.addEventListener('swipe', function(e) {
		if (!tapped) {
			message.animate(appear);
		}
	});
	
	image.addEventListener('singletap', function(e) {
		message.animate({opacity:0,duration:1});
		if (canTap) {
			if (tapped == false) {
				//shadow.opacity = 0;
				scrollView.maxZoomScale = 10;
				tapped = true;
				header.animate({top:-60});
				footer.animate({bottom:-40});
				scrollView.animate({backgroundColor:'#000'});
				e.source.animate({top:0,left:0,bottom:0,right:0});
			} else {
				//shadow.opacity = 1;
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
	//image._shadow = shadow;
	
	win.add(scrollView);
	
	return image;
}
module.exports = content;
