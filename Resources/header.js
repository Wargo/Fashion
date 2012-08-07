function showHeader() {
	var view = Ti.UI.createView({
		backgroundColor:'#F2F2F2',
		height:40,
		top:0,
		zIndex:100
	});
	var label = Ti.UI.createLabel({
		text:L('Vótame')
	});
	
	view.add(label);
	win.add(view);
	
	return view;
}
module.exports = showHeader;
