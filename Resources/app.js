var showHeader = require('header');
var content = require('content');
var showFooter = require('footer');

var win = Ti.UI.createWindow({
	backgroundImage:'images/background.png'
});

var images = [
	{image:'http://www.tuentifotos.com/media/fotos/Chica_Guapa_En_La_Playa.jpg'},
	{image:'http://3.bp.blogspot.com/_hX-0nWENCbo/SuGyuGqHtMI/AAAAAAAACr8/P9wogNshMMY/s1600/chicas+con+lindos+senos+y+bonitas+4.JPG'},
	{image:'http://4.bp.blogspot.com/_ThtSWn3PWc8/TKuQPg4qtoI/AAAAAAAAE_c/c2ldcHyx7EY/s1600/1.jpg'},
	{image:'http://www.tuentifotos.com/media/fotos/Autoretrato_De_Chica_Sexy.jpg'},
	{image:'http://www.paraisosocultos.com/wp-content/uploads/2011/05/02/chica-sacandose-una-foto-del-culo.jpg'},
	{image:'http://i50.tinypic.com/20zratt.jpg'},
	{image:'http://3.bp.blogspot.com/--aQ8Gc1Y-og/T3yfk0lqjEI/AAAAAAAAAJU/DxzXeh8TAa0/s400/chicas-argentinas.JPG'}
];

var random = Math.round(Math.random() * (images.length - 1));

var loading = Ti.UI.createActivityIndicator({
	message:L('Cargando nueva imagen')
});
win.add(loading);

var headerConfig = Ti.UI.createView({
	backgroundColor:'#F2F2F2',
	height:40,
	top:0,
	zIndex:150,
	opacity:0
});
headerConfig.add(Ti.UI.createLabel({text:L('Configuración')}));
win.add(headerConfig);

header = showHeader();
image = content();
footer = showFooter();

win.open();
