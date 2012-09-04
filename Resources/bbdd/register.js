function register(email, sex, country, year) {
	var path = Ti.App.dataURL + 'register.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				Ti.App.Properties.setBool('registered', true);
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
		user_id:Ti.App.Properties.getInt('user_id'),
		email:email,
		sex:sex,
		country:country,
		year:year
	});
}
module.exports = register;
