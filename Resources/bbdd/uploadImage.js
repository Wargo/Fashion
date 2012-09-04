function uploadImage(e, view, register) {
	var ind = Ti.UI.createProgressBar({
		width:200,
		height:50,
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		top:350,
		message:L('uploading'),
		font:{fontSize:12, fontWeight:'bold'},
		color:'#888'
	});
	view.add(ind);
	ind.show();
	
	var path = Ti.App.dataURL + 'uploadImage.php';
	var client = Ti.Network.createHTTPClient({
		onload: function() {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result['status'] == 'ok') {
				//image.image = result['thumb'];
				//image.big = result['image'];
				//loader.hide();
			} else {
				Ti.App.alert(L('txt_error'), result['message']);
			}
			if (register) {
				win.close({right:400});
			} else {
				view.animate({opacity:0});
			}
		},
		onerror: function() {
			Ti.App.alert(L('txt_error'), L('connection_error'));
		},
		onsendstream: function(e2) {
			ind.value = e2.progress;
		},
		timeout: 15000
	});
	client.open('POST', path);
	client.send({
		file:e.media,
		//file:e,
		user_id:Ti.App.Properties.getString('user_id')
	});
}
module.exports = uploadImage;