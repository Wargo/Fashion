function options(view, tools) {
	if (!view) {
		headerConfig.animate({opacity:1});
		tools.opacity = 0.5;
		var view = Ti.UI.createView({
			backgroundImage:'images/background.png',
			top:Ti.Platform.displayCaps.platformHeight - 100,
			opacity:0,
			height:Ti.Platform.displayCaps.platformHeight
		});
		var buttons = require('buttons');
		buttons(view);
		
		view.animate({top:0, opacity:1});
		win.add(view);
	} else {
		headerConfig.animate({opacity:0});
		tools.opacity = 1;
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
	}
	return view;
}
module.exports = options;