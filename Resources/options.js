//var win = Ti.UI.currentWindow;
function options(view, tools) {
	if (!view) {
		tools.opacity = 0.5;
		var view = Ti.UI.createView({
			backgroundImage:'images/background.png',
			top:Ti.Platform.displayCaps.platformHeight,
			height:Ti.Platform.displayCaps.platformHeight
		});
		var buttons = require('buttons');
		buttons(view);
		
		view.animate({top:0});
		win.add(view);
	} else {
		tools.opacity = 1;
		var disappear = Ti.UI.createAnimation({
			top:Ti.Platform.displayCaps.platformHeight
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