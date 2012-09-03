function options(view, tools, ok) {
	if (!view) {
		tools.opacity = 0;
		ok.opacity = 1;
		var view = Ti.UI.createView({
			backgroundImage:'images/background.png',
			top:300,
			opacity:0,
			height:Ti.Platform.displayCaps.platformHeight,
			zIndex:999
		});
		var buttons = require('buttons');
		buttons(view);
		
		view.animate({top:0, opacity:1});
		headerConfig.animate({opacity:1, delay:300});
		setTimeout(function() {
			//headerConfig.opacity = 1;
		}, 300);
		win.add(view);
	} else {
		headerConfig.animate({opacity:0});
		//headerConfig.opacity = 0;
		ok.opacity = 0;
		tools.opacity = 1;
		//win.remove(view); // Esto en lugar de la animación
		var disappear = Ti.UI.createAnimation({
			top:Ti.Platform.displayCaps.platformHeight,
			opacity:0
		});
		view.animate(disappear);
		disappear._view = view;
		disappear.addEventListener('complete', function(e) {
			win.remove(e.source._view);
		});
		
		view = null;
		
		if (Ti.App.result == 'ko' || Ti.App.result == '') {
			if (Ti.App.current) {
				//getPhoto(Ti.App.current.id);
			} else {
				//getPhoto();
			}
		}
	}
	return view;
}
module.exports = options;