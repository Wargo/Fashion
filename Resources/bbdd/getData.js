
module.exports = function(getImages) {
	
	var path = Ti.App.dataURL + 'my.php';
	var client = Ti.Network.createHTTPClient({
		onload: function() {
			var result = eval('(' + this.textResponse + ')');
			if (result.status === 'ok') {
				getImages(result.data);
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
