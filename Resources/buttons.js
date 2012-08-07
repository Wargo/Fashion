function buttons(view) {
	var createButton = require('button');
	var button1 = createButton(L('Hombre'), 'left', 0);
	var button2 = createButton(L('Mujer'), 'right', 0);
	var button3 = createButton(L('Desde'), 'left', 1);
	var button4 = createButton(L('Hasta'), 'right', 1);
	var button5 = createButton(L('País'), 'left', 2);
	var button6 = createButton(L('Todos'), 'right', 2);
	
	button1._selected = button2._selected = false;
	
	button1.addEventListener('singletap', function() {
		if (button1._selected) {
			button1._selected = false;
			button1._text.color = '#4F1722';
			button1._text.shadowColor = '#FFC7D2';
			button1.backgroundColor = 'transparent';
		} else {
			button1._selected = true;
			button1._text.color = '#FFC7D2';
			button1._text.shadowColor = '#4F1722';
			button1.backgroundColor = '#BC4159';
		}
	});
	button2.addEventListener('singletap', function() {
		if (button2._selected) {
			button2._selected = false;
			button2._text.color = '#4F1722';
			button2._text.shadowColor = '#FFC7D2';
			button2.backgroundColor = 'transparent';
		} else {
			button2._selected = true;
			button2._text.color = '#FFC7D2';
			button2._text.shadowColor = '#4F1722';
			button2.backgroundColor = '#BC4159';
		}
	});
	
	button6.addEventListener('singletap', function() {
		var bbdd = [{name:'Todos'}, {name:'España'}, {name:'Portugal'}, {name:'Francia'}, {name:'Italia'}, {name:'Alemania'}, {name:'Inglaterra'}, {name:'Bélgica'}, {name:'Holanda'}, {name:'Inglaterra'}];
		data = [];
		var select = Ti.UI.createTableView({
			opacity:0,
			borderWidth:5,
			borderRadius:5,
			borderColor:'#4F1722',
			separatorColor:'#4F1722',
			top:45,bottom:45,left:5,right:5
		});
		var thisOne = Ti.UI.createImageView({image:'images/prev.png', right:20});
		for (i in bbdd) {
			var row = Ti.UI.createTableViewRow({height:50,selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE});
			var content = Ti.UI.createLabel({
				text:bbdd[i].name,
				color:'#4F1722',
				left:20,
				height:40,
				font:{fontSize:18}
			});
			if (bbdd[i].name == button6._text.text) {
				row.add(thisOne);
			}
			row.add(content);
			row._current = bbdd[i].name
			select.appendRow(row);
			row.addEventListener('click', function(e) {
				if (typeof e.source._current == 'undefined') {
					e.source = e.source.parent;
				}
				button6._text.text = e.source._current;
				thisOne.opacity = 0;
				e.source.add(Ti.UI.createImageView({image:'images/prev.png', right:20}));
				var disappear = Ti.UI.createAnimation({opacity:0, delay:300});
				select.animate(disappear);
				disappear._select = select;
				disappear.addEventListener('complete', function(e2) {
					win.remove(e2.source._select);
				});
			});
		}
		win.add(select);
		select.animate({opacity:1});
	});
	
	view.add(button1);
	view.add(button2);
	view.add(button3);
	view.add(button4);
	view.add(button5);
	view.add(button6);
}
module.exports = buttons;