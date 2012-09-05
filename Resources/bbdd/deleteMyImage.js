
module.exports = function(id, active) {
	var path = Ti.App.dataURL + 'deleteMyImage.php';
	var client = Ti.Network.createHTTPClient({
		onload: function() {
			var result = eval('(' + this.responseText + ')');
			if (result.status === 'ko' && result.message) {
				Ti.App.alert(L('txt_error'), result.message);
			}
		},
		onerror: function(e) {
			Ti.App.alert(L('txt_error'), L('connection_error'));
		}
	});
	
	client.open('POST', path);
	client.send({
		user_id:Ti.App.Properties.getInt('user_id'),
		id:id,
		active:active
	});
}
