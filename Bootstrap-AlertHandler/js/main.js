var Main = function () {
    $(function () {
			$('#demos div.demo:eq(0)').append(BoxHandler.getBox(BoxHandler.BoxType.Info, 'Information', 'Please note that this...'));
			$('#demos div.demo:eq(1)').append(BoxHandler.getBox(BoxHandler.BoxType.Info, 'Information', 'Please note that this...', true));
			$('#demos div.demo:eq(2)').append(BoxHandler.getBox(BoxHandler.BoxType.Warning, 'Warning', 'Please note that this...'));
			$('#demos div.demo:eq(2)').append(BoxHandler.getBox(BoxHandler.BoxType.Danger, 'Danger', 'Please note that this...'));
			$('#demos div.demo:eq(2)').append(BoxHandler.getBox(BoxHandler.BoxType.Success, 'Success', 'Please note that this...'));
		});
}(jQuery);