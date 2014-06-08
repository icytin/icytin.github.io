var Main = function () {
    $(function () {
			$('#demos div.demo:eq(0)').append(AlertHandler.getAlert(AlertHandler.AlertType.Info, 'Information', 'Please note that this...'));
			$('#demos div.demo:eq(1)').append(AlertHandler.getAlert(AlertHandler.AlertType.Info, 'Information', 'Please note that this...', true));
			$('#demos div.demo:eq(2)').append(AlertHandler.getAlert(AlertHandler.AlertType.Warning, 'Warning', 'Please note that this...'));
			$('#demos div.demo:eq(2)').append(AlertHandler.getAlert(AlertHandler.AlertType.Danger, 'Danger', 'Please note that this...'));
			$('#demos div.demo:eq(2)').append(AlertHandler.getAlert(AlertHandler.AlertType.Success, 'Success', 'Please note that this...'));
		});
}(jQuery);