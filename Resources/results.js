function results() {
	
	var voting = require('bbdd/voting');
	var rating = Ti.UI.createLabel({
		font:{fontSize:13,fontStyle:'italic'},
		height:40,
		textAlign:'center',
		color:'#333'
	});
	var num = Ti.UI.createLabel({
		font:{fontSize:13,fontStyle:'italic'},
		height:40,
		textAlign:'center',
		color:'#333'
	});
	var tempLoading1 = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	var tempLoading2 = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	var m = 5;
	var block1 = Ti.UI.createView({
		backgroundImage:'images/bg_white.png',
		backgroundRepeat:true, // TODO da error en el log
		height:40,
		top:m,left:m,right:m
	});
	block1.add(rating);
	var block2 = Ti.UI.createView({
		backgroundImage:'images/bg_white.png',
		backgroundRepeat:true, // TODO da error en el log
		height:40,
		top:m,left:m,right:m
	});
	block2.add(num);
	block1.add(tempLoading1);
	block2.add(tempLoading2);
	
	tempLoading1.show();
	tempLoading2.show();
	voting(rating, num, tempLoading1, tempLoading2);
	
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
		text:L('saved_message'),
		font:{fontStyle:'italic'},
		color:'#333'
	}));
	win.add(showMessage);
	
	setTimeout(function() {
		showMessage.setShadow({
			shadowRadius:5,
			shadowOpacity:0.5,
			shadowOffset:{x:8, y:8}
		});
	}, 100);
	
	footer.animate({bottom:-40});
	
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
			setTimeout(function() {
				view.setShadow({
					shadowRadius:5,
					shadowOpacity:0.5,
					shadowOffset:{x:8, y:8}
				});
			}, 100);
			
			//voting(rating, num, tempLoading1, tempLoading2);
			
			var yourRating = Ti.UI.createLabel({
				text:L('txt_tu_voto') + '\r\n' + Ti.App.currentVote,
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
			
			view.add(block1);
			view.add(block2);
			view.add(block3);
			
			win.add(view);
			
			var tr1 = Ti.UI.iOS.create3DMatrix();
			tr1.m34 = 1 / -1000;
			tr1 = tr1.rotate(25,0,1,0);
			
			var tr2 = Ti.UI.iOS.create3DMatrix();
			tr2.m34 = 1 / -1000;
			tr2 = tr2.rotate(-25,0,1,0);
			
			view.animate({left:190, transform:tr2});
			
			image._scrollView.animate({left:-120, transform:tr1});
			
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
				left:85,
				delay:600,
				opacity:1
			});
			
			var continueButton = Ti.UI.createView({
				backgroundImage:'images/bg_white.png',
				backgroundRepeat:true,
				width:160,
				height:70,
				top:300,
				left:-300,
				opacity:0,
				borderColor:'#FFF',
				borderWidth:5,
				zIndex:250
			});
			
			setTimeout(function() {
				continueButton.setShadow({
					shadowRadius:5,
					shadowOpacity:0.5,
					shadowOffset:{x:8, y:8}
				});
			}, 100);
			
			continueButton.add(Ti.UI.createLabel({
				text:L('txt_siguiente') + ' >>',
				font:{fontStyle:'italic'},
				color:'#333',
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
		footer.animate({bottom:0});
		
		image._scrollView.setShadow({
			//shadowRadius:0,
			//shadowOpacity:0,
			//shadowOffset:{x:0, y:0}
		});
		
		var tr = Ti.UI.iOS.create3DMatrix();
		//tr.m34 = 1 / -1000;
		tr = tr.rotate(0,0,1,0);
		
		//image.animate({transition:tr});
		
		//image._scrollView.remove(image._shadow);
		getPhoto(Ti.App.current.id);
				
		image.opacity = 0;
		image.addEventListener('load', function() {
			image.opacity = 1;
			image._scrollView.transform = tr;
			header.animate({opacity:0.8});
			//image._scrollView.add(image._shadow);
			loading.hide();
			// TODO aquí entra más de una vez, y no sé por qué
			image.setShadow({
				//shadowRadius:5,
				//shadowOpacity:0.5,
				//shadowOffset:{x:8, y:8}
			});
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
