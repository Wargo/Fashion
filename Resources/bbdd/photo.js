function photo(current_id) {
	var path = Ti.App.dataURL + 'photo.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			Ti.App.result = result.status;
			if (result.status == 'ok') {
				loading.setMessage(L('Cargando nueva imagen'));
				Ti.App.current = result.data;
				image.image = Ti.App.current.url;
			} else {
				Ti.App.alert(L('Error'), result.message);
				loading.setMessage(L('No hay fotos nuevas'));
				var message = Ti.UI.createImageView({
					image:'images/mssgs.png',
					bottom:30,
					left:30,
					zIndex:200,
					opacity:0
				});
				message.add(Ti.UI.createLabel({top:20,font:{fontSize:13},text:L('Modificar filtros'), color:'#FFF'}));
				win.add(message);
				var appear = Ti.UI.createAnimation({opacity:1, delay:1000});
				message.animate(appear);
				appear.addEventListener('complete', function() {
					message.animate({opacity:0, delay:4000});
				});
			}
		},
		onerror: function(e) {
			Ti.App.alert(L('Error'), L('Ha ocurrido un error con la conexión'));
		},
		timeout: 15000
	});
	
	client.open('POST', path);
	
	var sex = '';
	if (Ti.App.Properties.getBool('boys')) {
		sex += '0';
	}
	if (Ti.App.Properties.getBool('girls')) {
		sex += '1';
	}
	
	if (sex == '') {
		var interval = setInterval(function() {
			if (Ti.App.countries.length > 0) {
				clearInterval(interval);
				var toRemove = options(null, footer._tools);
				footer._tools.opacity = 1;
				footer.remove(footer._tools);
				var ok = Ti.UI.createView({height:40,width:50,left:0});
				ok.add(Ti.UI.createLabel({text:L('Ok')}));
				footer.add(ok);
				ok.addEventListener('singletap', function() {
					if (!Ti.App.Properties.getBool('boys') && !Ti.App.Properties.getBool('girls')) {
						Ti.App.alert(L('Error'), L('Tienes que seleccionar qué es lo que buscas'));
						return;
					}
					toRemove.animate({top:400,opacity:0});
					setTimeout(function() {
						win.remove(toRemove);
					}, 300);
					footer.add(footer._tools);
					footer.remove(ok);
					if (Ti.App.Properties.getBool('boys')) {
						sex += '0';
					}
					if (Ti.App.Properties.getBool('girls')) {
						sex += '1';
					}
					headerConfig.animate({opacity:0});
					send();
				});
			}
		}, 100);
	} else {
		send();
	}
	
	function send() {
		client.send({
			user:Ti.App.Properties.getInt('user_id'),
			sex:sex,
			age_from:min_age + Ti.App.Properties.getInt('age_from'),
			age_to:min_age + Ti.App.Properties.getInt('age_to'),
			country:Ti.App.Properties.getInt('country'),
			current_photo:current_id
		});
	}
}
module.exports = photo;