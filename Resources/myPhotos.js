module.exports = function() {

	var win = Ti.UI.createWindow({
		backgroundImage:'images/background.png'
	});

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
		{image:'http://ohcasionbv.es/img/Property/a1f9ee9f-2e71-4c15-875a-299f3ca22707/f37b4bce-c808-406b-b19b-1242438b37cf,fitCrop,180,121.jpg'}
	]

	var top = 10;
	for (i in data) {
		var left = 10 + (i % 3) * 110;
		if (i % 3 === 0) {
			top += 110;
		}
		var img = Ti.UI.createImageView({
			image: data[i].image,
			width:100,
			height:100,
			top:top,
			left:left
		});
		win.add(img);
	}

	return win;

}
