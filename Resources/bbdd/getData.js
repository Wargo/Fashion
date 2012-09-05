
module.exports = function(getImages, page) {
	
	var path = Ti.App.dataURL + 'my.php';
	var client = Ti.Network.createHTTPClient({
		onload: function() {
			var result = eval('(' + this.responseText + ')');
			if (result.status === 'ok') {
				getImages(result.data, page);
			} else {
				if (result.message) {
					Ti.App.alert(L('txt_error'), result.message);
				}
				getImages(null);
			}
		},
		onerror: function() {
			Ti.App.alert(L('txt_error'), L('connection_error'));
			getImages(null);
		}
	});
	
	client.open('POST', path);
	client.send({
		id:Ti.App.Properties.getInt('user_id'),
		page:page
	});
	
}
