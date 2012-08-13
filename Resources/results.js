function results() {
	
	var voting = require('bbdd/voting');
	
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
				width:135,
				left:400,
				layout:'vertical',
				borderRadius:5
			});
			
			var tempLoading1 = Ti.UI.createActivityIndicator({
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
			});
			
			var tempLoading2 = Ti.UI.createActivityIndicator({
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
			});
			
			var rating = Ti.UI.createLabel({
				font:{fontSize:13,fontStyle:'italic'},
				height:40,
				textAlign:'center',
				color:'#333'
			});
			var m = 5;
			var block1 = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true, // TODO da error en el log
				height:40,
				top:m,left:m,right:m
			});
			block1.add(rating);
			
			var num = Ti.UI.createLabel({
				font:{fontSize:13,fontStyle:'italic'},
				height:40,
				textAlign:'center',
				color:'#333'
			});
			var block2 = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true, // TODO da error en el log
				height:40,
				top:m,left:m,right:m
			});
			block2.add(num);
			
			voting(rating, num, tempLoading1, tempLoading2);
			
			var yourRating = Ti.UI.createLabel({
				text:L('Tu voto') + '\r\n' + Ti.App.currentVote,
				font:{fontSize:13,fontStyle:'italic'},
				height:40,
				textAlign:'center',
				color:'#333'
			});
			var block3 = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true, // TODO da error en el log
				height:40,
				top:m,left:m,right:m
			});
			block3.add(yourRating);
			
			block1.add(tempLoading1);
			block2.add(tempLoading2);
			
			tempLoading1.show();
			tempLoading2.show();
			
			view.add(block1);
			view.add(block2);
			view.add(block3);
			
			win.add(view);
			
			view.animate({left:190});
			
			image._scrollView.animate({left:-150});
			//header.animate({left:-100});
			header.animate({opacity:0});
			
			var continueSmallButton = Ti.UI.createView({
				//backgroundColor:'#F2F2F2',
				backgroundColor:'transparent',
				height:40,
				right:-75,
				top:5,
				width:60,
				zIndex:100,
				opacity:0.8,
				borderRadius:5
			});
			continueSmallButton.add(Ti.UI.createImageView({image:'images/next_dark.png'}));
			win.add(continueSmallButton);
			continueSmallButton.animate({right:-5});
			
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
				toContinue(view, continueButton, continueSmallButton);
			});
			continueSmallButton.addEventListener('singletap', function() {
				continueSmallButton.opacity = 0.7;
				toContinue(view, continueButton, continueSmallButton);
			});
		})
	});
	
	function toContinue(view, continueButton, continueSmallButton) {
		image._scrollView.remove(image._shadow);
		getPhoto(Ti.App.current.id);
				
		image.opacity = 0;
		image.addEventListener('load', function() {
			image.opacity = 1;	
			header.animate({opacity:0.8});
			image._scrollView.add(image._shadow);
			loading.hide();
			// TODO aquí entra más de una vez, y no sé por qué
		});
		for (j = 0; j < 5; j ++) {
			eval("header._stars._star_" + j + "._img.image = 'images/star_black.png';");
		}
		
		image._scrollView.animate({left:0});
		view.animate({opacity:0, left:400});
		continueButton.animate({opacity:0, left: 400});
		continueSmallButton.animate({right:-75});
		//header.animate({left:55});
		
		loading.show();
		
		setTimeout(function() {
			//header.animate({opacity:0.8});
			win.remove(showMessage);
			win.remove(view);
			win.remove(continueButton);
			win.remove(continueSmallButton);
		}, 300);
		canTap = true;
		//vote.enabled = true;
		voted = false;
	}
	
}
module.exports = results;
