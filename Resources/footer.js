function showFooter() {
	var optionsView = null;
	var view = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		bottom:0,
		zIndex:100
	});
	var tools = Ti.UI.createView({
		height:40,
		width:50,
		left:0
	});
	tools.add(Ti.UI.createImageView({image:'images/tools_dark.png'}));
	
	tools.addEventListener('singletap', function() {
		optionsView = options(optionsView, tools);
	});
	
	var separator = Ti.UI.createView({
		width:1,
		backgroundColor:'#BFB8B2',
		left:50
	});
	
	view.add(separator);
	view.add(tools);
	win.add(view);
	
	view._tools = tools;
	
	return view;
}
module.exports = showFooter;