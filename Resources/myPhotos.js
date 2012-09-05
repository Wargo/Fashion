module.exports = function() {
	
	var images = [];
	var editing = false;
	var canEdit = false;
	var y = 0;

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
	
	var tr = Ti.UI.create2DMatrix({
		rotate:0
	});
	
	var editButton = Ti.UI.createView({
		width:60,
		height:40,
		right:0,
		opacity:0.4
	});
	editButton.add(Ti.UI.createLabel({text:L('edit')}));
	editButton.addEventListener('click', function() {
		f_editing();
	});
	function f_editing() {
		if (!canEdit) {
			return;
		}
		
		y = scrollableView.currentPage;
		
		if (editing) {
			for (x in images[y]) {
				images[y][x].animate({transform:tr, duration:100})
				images[y][x]._smallView.remove(images[y][x]._deleteImage);
			}
			editing = false;
			return;
		}
		editing = true;
		
		var tr1 = Ti.UI.create2DMatrix({
			rotate:-2
		});
		var tr2 = Ti.UI.create2DMatrix({
			rotate:2
		});
		
		for (x in images[y]) {
			
			var deleteImage = Ti.UI.createView({
				width:23,
				height:23,
				top:5,
				right:0,
				borderRadius:10,
				backgroundColor:'#FFF',
				borderColor:'#000',
				borderWidth:2,
				opacity:0.7,
				_x:x,
				_id:images[y][x]._id
			});
			deleteImage.add(Ti.UI.createImageView({image:'images/delete.png', _x:x, _id:images[y][x]._id}));
			deleteImage.addEventListener('click', function(e) {
				var deletingImage = require('bbdd/deleteMyImage');
				if (images[y][e.source._x]._smallView.opacity > 0.4) {
					images[y][e.source._x]._smallView.animate({opacity:0.4});
					deletingImage(e.source._id, 0)
				} else {
					images[y][e.source._x]._smallView.animate({opacity:1});
					deletingImage(e.source._id, 1)
				}
			});
			images[y][x]._smallView.add(deleteImage);
			
			images[y][x]._deleteImage = deleteImage;
			
			eval('var animation1_' + x + ' = Ti.UI.createAnimation({transform:tr1, duration:100});');
			eval('var animation2_' + x + ' = Ti.UI.createAnimation({transform:tr2, duration:100});');
			
			var animation1_x = eval('animation1_' + x);
			var animation2_x = eval('animation2_' + x);
		
			images[y][x].animate(animation1_x);
			
			animation1_x._x = x;
			animation2_x._x = x;
			
			animation1_x.addEventListener('complete', function(e) {
				currentX = e.source._x;
				var animation2_x = eval('animation2_' + currentX);
				if (editing) {
					images[y][currentX].animate(animation2_x);
				}
			});
			animation2_x.addEventListener('complete', function(e) {
				currentX = e.source._x;
				var animation1_x = eval('animation1_' + currentX);
				if (editing) {
					images[y][currentX].animate(animation1_x);
				}
			});
			
		}
	}

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
		pagingControlColor:'transparent',
		cacheSize:10
	});
	
	scrollableView.addEventListener('scroll', function() {
		if (editing) {
			//var y = scrollableView.currentPage;
			for (x in images[y]) {
				images[y][x].animate({transform:tr, duration:1})
				images[y][x]._smallView.remove(images[y][x]._deleteImage);
			}
			editing = false;
		}
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
		
		var aux = [];
		
		var top = 10;
		for (i in data) {
			var left = 15 + (i % 3) * 100;
			if (i % 3 === 0 && i != 0) {
				top += 135;
			}
			var smallView = Ti.UI.createView({
				top:top,
				left:left,
				width:90,
				height:130,
				opacity:1
			});

			var smallLoading = Ti.UI.createActivityIndicator();
			smallLoading.show();

			var img = Ti.UI.createImageView({
				top:0,
				image: data[i].thumb,
				opacity:0,
				_firstLoad:true,
				_smallLoading:smallLoading,
				_id:data[i].id,
				_i:i
			});
			
			if (data[i].active != 1) {
				smallView.opacity = 0.4;
			}
			
			img.addEventListener('longpress', function() {
				f_editing();
			});
			img.addEventListener('singletap', function(e) {
				var loadingImage = Ti.UI.createActivityIndicator();
				var imageView = Ti.UI.createScrollView({
					maxZoomScale: 10,
					minZoomScale: 1,
					backgroundColor:'#000',
					top:0,left:0,right:0,bottom:0
				});
				imageView.add(loadingImage);
				imageView.add(Ti.UI.createImageView({image:data[e.source._i].photo}));
				win.add(imageView);
				imageView.addEventListener('singletap', function() {
					win.remove(imageView);
				});
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
			
			aux.push(img);

			var rating = require('stars');
			var stars = rating(data[i].rating, 90);
			stars.top = 95;
			
			img._smallView = smallView;

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
		
		images.push(aux);
		
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
