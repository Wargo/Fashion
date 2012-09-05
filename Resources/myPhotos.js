module.exports = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/background.png'
	});
	
	var scrollView = Ti.UI.createScrollView({
		showVerticalScrollIndicator:true,
		contentHeight:'auto',
		top:40
	});

<<<<<<< HEAD
	var data = [
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'},
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'}
	]

	var top = 10;
	for (i in data) {
		var left = 12 + (i % 3) * 100;
		if (i % 3 === 0 && i != 0) {
			top += 100;
		}
		var img = Ti.UI.createImageView({
			image: data[i].image,
			width:90,
			height:90,
			top:top,
			left:left,
			backgroundColor:'#FFF'
		});
		scrollView.add(img);
=======
	function getImages(data) {
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
>>>>>>> 2eb975f58d61f3b76247882fc2a656ff8d754014
	}
	
	var getData = require('bbdd/getMyImages');
	getData(getImages);
	
	win.add(scrollView);

	return win;

}
