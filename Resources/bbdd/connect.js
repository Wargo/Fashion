function connect() {
	var path = Ti.App.dataURL + 'connect.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				Ti.App.Properties.setInt('user_id', result.id);
			} else {
				Ti.App.alert(L('txt_error'), result.message);
			}
		},
		onerror: function(e) {
			Ti.App.alert(L('txt_error'), L('connection_error'));
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		device:device
	});
}
module.exports = connect;
