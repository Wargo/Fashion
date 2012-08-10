function countries() {
	var path = Ti.App.dataURL + 'countries.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				Ti.App.countries = result.countries;
			} else {
				Ti.App.alert(L('Error'), result.message);
			}
		},
		onerror: function(e) {
			Ti.App.alert(L('Error'), L('Ha ocurrido un error con la conexión'));
		},
		timeout: 15000
	});
	
	client.open('GET', path);
	client.send();
}
module.exports = countries;
