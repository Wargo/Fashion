function content() {
	var margin = 15;
	var tapped = false;
	
	var image = Ti.UI.createImageView({
		right:margin,left:margin,top:margin*4,bottom:margin*4,
		image:images[random].image,
		preventDefaultImage:true,
		//backgroundColor:'#FFF',
		//borderColor:'#FFF',
		//borderWidth:5
	});
	loading.show();
	image.addEventListener('load', function() {
		loading.hide();
	});
	var scrollView = Ti.UI.createScrollView({
		maxZoomScale: 1, // 10
		minZoomScale: 1,
		width:320
	});
	scrollView.add(image);
	
	image.addEventListener('singletap', function(e) {
		if (tapped == false) {
			scrollView.maxZoomScale = 10;
			tapped = true;
			header.animate({top:-40});
			footer.animate({bottom:-40});
			scrollView.animate({backgroundColor:'#000'});
			e.source.animate({top:0,left:0,bottom:0,right:0});
		} else {
			scrollView.maxZoomScale = 1;
			scrollView.zoomScale = 1;
			tapped = false;
			header.animate({top:0});
			footer.animate({bottom:0});
			scrollView.animate({backgroundColor:'transparent'});
			e.source.animate({top:margin,left:margin,bottom:margin,right:margin});
		}
	});
	
	image._scrollView = scrollView;
	
	win.add(scrollView);
	
	return image;
}
module.exports = content;