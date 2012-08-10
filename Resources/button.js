function button(text, positionX, positionY) {
	var size = 133;
	
	var border1 = Ti.UI.createView({
		backgroundColor:'#B4394F',
		width:1,
		right:0
	});
	var border2 = Ti.UI.createView({
		backgroundColor:'#F486A0',
		width:1,
		left:0
	});
	var separator = Ti.UI.createView({
		backgroundColor:'#B4394F',
		height:1,
		bottom:0
	});
	var button = Ti.UI.createView({
		width:'50%',
		height:size
	});
	var buttonText = Ti.UI.createLabel({
		text:text,
		color:'#4F1722',
		textAlign:'center',
		shadowColor:'#FFC7D2',
		shadowOffset:{x:1,y:1}
	});
	button.add(buttonText);
	button.add(separator);
	
	if (positionX == 'left') {
		button.left = 0;
		button.add(border1);
	} else {
		button.right = 0;
		button.add(border2);
	}

	switch (positionY) {
		case 0:
			button.top = 40;
			break;
		case 1:
			button.top = 40 + size;
			buttonText.top = 30;
			var views = [];
			for (i = min_age; i <= max_age; i ++) {
				var age = Ti.UI.createView();
				age.add(Ti.UI.createLabel({
					text:i,
					color:'#B4394F',
					font:{fontSize:50}
				}));
				views.push(age);
			}
			var select = Ti.UI.createScrollableView({
				views:views,
				width:60,
				top:10,
				height:140
			});
			if (positionX == 'right') {
				var age = 'age_to'; 
				select.currentPage = 17;
			} else {
				var age = 'age_from';
				select.currentPage = 7;
			}
			if (Ti.App.Properties.getInt(age)) {
				select.currentPage = Ti.App.Properties.getInt(age);
			} else {
				Ti.App.Properties.setInt(age, select.currentPage);
			}
			var next = Ti.UI.createView({
				right:0,
				top:0,
				bottom:0,
				width:40
			});
			next.add(Ti.UI.createImageView({image:'images/next.png'}));
			var prev = Ti.UI.createView({
				left:0,
				top:0,
				bottom:0,
				width:40
			});
			prev.add(Ti.UI.createImageView({image:'images/prev.png'}));
			next.addEventListener('touchstart', function() {
				next.backgroundColor = '#BC4159';
				next.opacity = 0.5;
			});
			next.addEventListener('touchend', function() {
				next.backgroundColor = 'transparent';
				next.opacity = 1;
			});
			prev.addEventListener('touchstart', function() {
				prev.backgroundColor = '#BC4159';
				prev.opacity = 0.5;
			});
			prev.addEventListener('touchend', function() {
				prev.backgroundColor = 'transparent';
				prev.opacity = 1;
			});
			next.addEventListener('singletap', function() {
				if (select.currentPage < views.length - 1) {
					select.currentPage += 1;
					Ti.App.Properties.setInt(age, select.currentPage);
				}
			});
			prev.addEventListener('singletap', function() {
				if (select.currentPage > 0) {
					select.currentPage -= 1;
					Ti.App.Properties.setInt(age, select.currentPage);
				}
			});
			next.addEventListener('longpress', function(e) {
				var interval = setInterval(function() {
					if (select.currentPage < views.length - 1) {
						select.currentPage += 1;
					}
				}, 100);
				e.source.addEventListener('touchend', function() {
					clearInterval(interval);
					Ti.App.Properties.setInt(age, select.currentPage);
				});
			});
			prev.addEventListener('longpress', function(e) {
				var interval = setInterval(function() {
					if (select.currentPage > 0) {
						select.currentPage -= 1;
					}
				}, 100);
				e.source.addEventListener('touchend', function() {
					clearInterval(interval);
					Ti.App.Properties.setInt(age, select.currentPage);
				});
			});
			
			select.addEventListener('scroll', function() {
				Ti.App.Properties.setInt(age, select.currentPage);
			});
			
			button.add(select);
			button.add(next);
			button.add(prev);
			break;
		case 2:
			button.top = 40 + size * 2;
			break;
	}
	
	button._text = buttonText;
	
	return button;
}
module.exports = button;