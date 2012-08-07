function showFooter() {
	var optionsView = null;
	var view = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		bottom:0,
		zIndex:100
	});
	var tools = Ti.UI.createImageView({
		image:'images/tools.png',
		left:10
	});
	var options = require('options');
	tools.addEventListener('singletap', function() {
		optionsView = options(optionsView, tools);
	});
	
	view.add(tools);
	win.add(view);
	
	return view;
}
module.exports = showFooter;