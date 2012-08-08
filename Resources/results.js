function results(vote) {
	
	var animation = Ti.UI.createAnimation({
		top:200,
		opacity:0.7
	});
	var showMessage = Ti.UI.createView({
		backgroundImage:'images/bg_white.png',
		backgroundRepeat:true,
		width:220,
		height:70,
		top:500,
		opacity:0,
		borderColor:'#FFF',
		borderWidth:5
	});
	
	showMessage.add(Ti.UI.createLabel({
		text:L('Voto guardado'),
		font:{fontStyle:'italic'},
		color:'#333'
	}));
	win.add(showMessage);
	
	showMessage.animate(animation);
	animation.addEventListener('complete', function() {
		var animation2 = Ti.UI.createAnimation({
			top:-100,
			delay:1000,
			opacity:0
		});
		showMessage.animate(animation2);
		animation2.addEventListener('complete', function() {
			var view = Ti.UI.createView({
				backgroundColor:'#F2F2F2',
				top:60,bottom:60,
				width:130,
				left:400,
				layout:'vertical'
			});
			
			var rating = Ti.UI.createLabel({
				text:L('Promedio') + '\r\n' + Math.round(Math.random() * 5 * Math.pow(10, 2)) / Math.pow(10, 2),
				font:{fontSize:13,fontStyle:'italic'},
				height:40,
				textAlign:'center',
				color:'#333'
			});
			var m = 3;
			var block1 = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true, // TODO da error en el log
				height:40,
				top:m*2,left:m,right:m
			});
			block1.add(rating);
			
			var num = Ti.UI.createLabel({
				text:L('Núm. votos') + '\r\n' + Math.round(Math.random() * 100),
				font:{fontSize:13,fontStyle:'italic'},
				height:40,
				textAlign:'center',
				color:'#333'
			});
			var block2 = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true, // TODO da error en el log
				height:40,
				top:m*2,left:m,right:m
			});
			block2.add(num);
			
			var yourRating = Ti.UI.createLabel({
				text:L('Tu voto') + '\r\n' + Math.round(Math.random() * 5 * Math.pow(10, 2)) / Math.pow(10, 2),
				font:{fontSize:13,fontStyle:'italic'},
				height:40,
				textAlign:'center',
				color:'#333'
			});
			var block3 = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true, // TODO da error en el log
				height:40,
				top:m*2,left:m,right:m
			});
			block3.add(yourRating);
			
			view.add(block1);
			view.add(block2);
			view.add(block3);
			
			win.add(view);
			
			view.animate({left:190});
			
			image._scrollView.animate({left:-150});
			
			var animate3 = Ti.UI.createAnimation({
				left:50,
				delay:600,
				opacity:1
			});
			
			var continueButton = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true,
				width:220,
				height:70,
				top:300,
				left:-300,
				opacity:0,
				borderColor:'#FFF',
				borderWidth:5
			});
			
			continueButton.add(Ti.UI.createLabel({
				text:L('Siguiente') + ' >>',
				font:{fontStyle:'italic'},
				color:'#333',
				shadow:{
				    shadowRadius:10,
				    shadowOpacity:0.5,
				    shadowOffset:{x:5, y:10}
				}
			}));
			
			continueButton.animate(animate3);
			
			win.add(continueButton);
			
			continueButton.addEventListener('singletap', function() {
				random = Math.round(Math.random() * (images.length - 1));
				
				image.image = images[random].image;
				image.addEventListener('load', function() {
					loading.hide();
					// TODO aquí entra más de una vez, y no sé por qué
				});
				for (j = 0; j < 5; j ++) {
					eval("header._stars._star_" + j + "._img.image = 'images/star_off.png';");
				}
				
				image._scrollView.animate({left:0});
				view.animate({opacity:0, left:400});
				continueButton.animate({opacity:0, left: 400});
				
				loading.show();
				
				setTimeout(function() {
					win.remove(showMessage);
					win.remove(view);
					win.remove(continueButton);
				}, 300);
				canTap = true;
				vote.enabled = true;
			});
		})
	});
	
}
module.exports = results;
