function photo(current_id) {
	canTap = false;
	var path = Ti.App.dataURL + 'photo.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			Ti.App.result = result.status;
			if (result.status == 'ok') {
				loading.setMessage(L('loading_text'));
				Ti.App.current = result.data;
				image.image = Ti.App.current.url;
				win.remove(refresh2); // TODO muestra warnings cuando no está todavía añadido
			} else {
				Ti.App.alert(L('txt_error'), result.message);
				loading.setMessage(L('no_photos_error'));
				
				refresh2.add(Ti.UI.createImageView({image:'images/refresh.png'}));
				refresh2.addEventListener('singletap', function() {
					loading.setMessage(L('loading_text'));
					win.remove(refresh2);
					client.open('POST', path);
					send();
				});
				refresh2.animate({opacity:0.7});
				if (refresh2.opacity == 0) {
					win.add(refresh2);
				}
				
				messageFilter.add(Ti.UI.createLabel({top:15,font:{fontSize:13},text:L('modify_filters'), color:'#FFF'}));
				if (messageFilter.opacity == 0) {
					win.add(messageFilter);
					var appear = Ti.UI.createAnimation({opacity:0.7, delay:1000});
					messageFilter.animate(appear);
					appear.addEventListener('complete', function() {
						messageFilter.animate({opacity:0, delay:4000});
					});
				}
			}
		},
		onerror: function(e) {
			Ti.App.alert(L('txt_error'), L('connection_error'));
			loading.hide();
			var refresh = Ti.UI.createView({
				backgroundColor:'#000',
				opacity:0,
				width:180,
				height:180,
				borderRadius:15,
				top:190
			});
			var wifi = Ti.UI.createImageView({image:'images/wifi.png', top:40});
			win.add(wifi);
			refresh.add(Ti.UI.createLabel({
				text:L('loading_error'),
				font:{fontSize:12},
				top:10,left:10,right:10,
				color:'#FFF',
				textAlign:'center'
			}));
			refresh.add(Ti.UI.createImageView({image:'images/refresh.png', top:65}));
			refresh.add(Ti.UI.createLabel({
				text:L('wifi'),
				font:{fontSize:12},
				bottom:10,left:10,right:10,
				color:'#FFF',
				textAlign:'center'
			}));
			win.add(refresh);
			refresh.animate({opacity:0.7});
			refresh.addEventListener('singletap', function() {
				loading.show();
				win.remove(refresh);
				win.remove(wifi);
				client.open('POST', path);
				send();
			});
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
				footer._tools.opacity = 1;
				footer.remove(footer._tools);
				var ok2 = Ti.UI.createView({height:40,width:50,left:0});
				var toRemove = options(null, footer._tools, ok2);
				ok2.add(Ti.UI.createLabel({text:L('ok')}));
				footer.add(ok2);
				ok2.addEventListener('singletap', function() {
					if (!Ti.App.Properties.getBool('boys') && !Ti.App.Properties.getBool('girls')) {
						Ti.App.alert(L('txt_error'), L('options_error'));
						return;
					}
					toRemove.animate({top:400,opacity:0});
					setTimeout(function() {
						win.remove(toRemove);
					}, 300);
					footer.add(footer._tools);
					footer.remove(ok2);
					footer._tools.opacity = 1;
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