window.onload = function() {
	
	$('h1').fadeIn();
	
	setTimeout(function() {
		_loadMainAnimation();
	}, 700);
	
	var _loadMainAnimation = function() {
		
		var isSafari = /constructor/i.test(window.HTMLElement),
			isFF = !!navigator.userAgent.match(/firefox/i);
		
		var box = document.getElementById("theBox"),
			count = 0,
			tween,
			width = window.innerWidth - 70,
			t = width / 200;
			
		tween = TweenMax.to(box, t, {left: (window.innerWidth - 70)+ "px", repeat:10000, yoyo:true, onRepeat:onRepeat, repeatDelay:0.5, ease:Linear.easeNone});

		var turb = document.querySelectorAll('#filter feImage')[0],
			dm = document.querySelectorAll('#filter feDisplacementMap')[0],
			currVal = 0;
		
		box.addEventListener('touchstart', onOver);
		box.addEventListener('mouseover', onOver);

		function onOver(e) {
			// box.innerHTML = '=)';
			if(tween.isActive()){
				box.style.backgroundImage = "url('img/birdie.png')";
				tween.pause();
			}
			else {
				tween.resume();
				box.style.backgroundImage = "url('img/birdie_follow_me.png')";
			}
		};
		
		box.addEventListener('mouseout', function(e) {
			box.style.backgroundImage = "url('img/birdie_follow_me.png')";
			tween.resume();
		});

		box.addEventListener('click', function(e) {
			
			TweenLite.set(turb, { attr: { x: isFF ? e.offsetX : e.offsetX + 10, y: isFF ? e.offsetY : e.offsetY + 10, width: 0, height: 0 } });
			TweenLite.to(turb, 3, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
			TweenLite.fromTo(dm, 2, { attr: { scale: 30 } }, { attr: { scale: 0 } });
		});

		function onRepeat() {
			currVal = ++count;
		}
	};
};
