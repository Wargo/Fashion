
module.exports = function(getImages) {
	
	var loading = Ti.UI.createActivityIndicator();
	win.add(loading);
	loading.show();
	
	var path = Ti.App.url + 'my.php';
	var client = Ti.Network.createHTTPClient({
		onload: function() {
			var result = eval('(' + this.textResponse + ')');
			if (result.status === 'ok') {
				getImages(result.data);
				loading.hide();
			} else {
				Ti.App.alert(L('txt_error'), result.message);
			}
		},
		onerror: function() {
			Ti.App.alert(L('txt_error'), L('connection_error'));
		}
	});
	
	client.open('POST', path);
	client.send({
		id:Ti.App.Properties.getInt('user_id')
	});
	
}
