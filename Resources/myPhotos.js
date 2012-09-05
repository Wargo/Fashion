module.exports = function() {
	
	var images = [];
	var editing = false;
	var canEdit = false;

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
	
	var separator = Ti.UI.createView({
		width:1,
		backgroundColor:'#BFB8B2',
		right:60
	});
	var separator2 = Ti.UI.createView({
		width:1,
		backgroundColor:'#BFB8B2',
		left:50
	});
	
	var editButton = Ti.UI.createView({
		width:60,
		height:40,
		right:0,
		opacity:0.4
	});
	editButton.add(Ti.UI.createLabel({text:L('edit')}));
	editButton.addEventListener('click', function() {
		if (!canEdit) {
			return;
		}
		if (editing) {
			win.close({left:400});
		}
		editing = true;
		var tr1 = Ti.UI.create2DMatrix({
			rotate:-2
		});
		var tr2 = Ti.UI.create2DMatrix({
			rotate:2
		});
		
		for (x in images) {
			
			eval('var animation1_' + x + ' = Ti.UI.createAnimation({transform:tr1, duration:100});');
			eval('var animation2_' + x + ' = Ti.UI.createAnimation({transform:tr2, duration:100});');
			
			var animation1_x = eval('animation1_' + x);
			var animation2_x = eval('animation2_' + x);
		
			images[x].animate(animation1_x);
			
			animation1_x._x = x;
			animation2_x._x = x;
			
			animation1_x.addEventListener('complete', function(e) {
				currentX = e.source._x;
				var animation2_x = eval('animation2_' + currentX);
				images[currentX].animate(animation2_x);
			});
			animation2_x.addEventListener('complete', function(e) {
				currentX = e.source._x;
				var animation1_x = eval('animation1_' + currentX);
				images[currentX].animate(animation1_x);
			});
			
		}
	});

	var header = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		top:0,
		zIndex:1000
	});
	header.add(Ti.UI.createLabel({text:L('title_my_photos')}));
	header.add(backButton);
	header.add(editButton);
	header.add(separator);
	header.add(separator2);
	
	var scrollableView = Ti.UI.createScrollableView({
		showPagingControl:true,
		pagingControlColor:'transparent'
	});
	
	var loading = Ti.UI.createActivityIndicator();
	win.add(loading);
	loading.show();
	
	function getImages(data, page) {
		if (data === null) {
			//win.close({left:400});
			return;
		}
		
		var view = Ti.UI.createView({top:40})
		
		var top = 10;
		for (i in data) {
			var left = 15 + (i % 3) * 100;
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
			
			images.push(img);

			var rating = require('stars');
			var stars = rating(data[i].rating, 90);
			stars.top = 95;

			smallView.add(smallLoading);
			smallView.add(img);
			smallView.add(stars);
			if (data[i].num != 1) {
				var num_votes = String.format(L('num_votes'), data[i].num);
			} else {
				var num_votes = String.format(L('num_vote'), 1);
			}
			smallView.add(Ti.UI.createLabel({text:num_votes, top:115, font:{fontSize:12}}));
			//scrollView.add(smallView);
			view.add(smallView);
			
			setTimeout(function() {
				editButton.opacity = 1;
				canEdit = true;
			}, 300);
		}
		view.add(Ti.UI.createView({height:15, top:top + 140})); // Espacio al final del scrollview
		//scrollView.add(Ti.UI.createView({height:15, top:top + 140})); // Espacio al final del scrollview
		//win.add(scrollView);
		scrollableView.addView(view);
		getData(getImages, page + 1);
		win.add(scrollableView);
	}
	
	var getData = require('bbdd/getData');
	getData(getImages, 1);
	
	win.add(header);

	return win;

}
