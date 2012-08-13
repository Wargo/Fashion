function voting(rating, num, tempLoading1, tempLoading2) {
	var path = Ti.App.dataURL + 'vote.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				//Ti.App.countries = result.countries;
				rating.text = L('Promedio') + '\r\n' + result.rating;
				num.text = L('Núm. votos') + '\r\n' + result.total;
				tempLoading1.hide();
				tempLoading2.hide();
			} else {
				Ti.App.alert(L('Error'), result.message);
			}
		},
		onerror: function(e) {
			Ti.App.alert(L('Error'), L('Ha ocurrido un error con la conexión'));
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	client.send({
		user:Ti.App.Properties.getInt('user_id'),
		vote:Ti.App.currentVote,
		photo:Ti.App.current.id
	});
}
module.exports = voting;
