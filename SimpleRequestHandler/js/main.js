var Main = function () {
    $(function () {
		
			// Get IP from jsontest.com
			var res = requestHandler.get(undefined, 'http://ip.jsontest.com/');
			if(res) {
				var percent = 13;
				$('.progress-bar').css('width', percent + '%');
				setTimeout(function() {
					$('.progress-bar').css('width', 55 + '%');
					setTimeout(function() {
						$('.progress-bar').css('width', 85 + '%');
						setTimeout(function() {
							$('#ipJsonRes').html(res.ip).css('padding-bottom', '20px');
							$('#ipJsonLabel').html('Received IP:');
						}, 200);
					}, 300);
				}, 400);
			}
			
		});
}(jQuery);