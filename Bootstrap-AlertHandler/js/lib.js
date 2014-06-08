var BoxHandler = function () {

    var self;

    return {
			BoxType: {
				Success: 0,
				Warning: 1,
				Error: 2,
				Info: 3
			},
			getBox: function (boxType, title, message, closable) {
					var boxclass = boxType === this.BoxType.Warning ? 'alert-warning ' : boxType === this.BoxType.Success ? 'alert-success ' : boxType === this.BoxType.Info ? 'alert-info ' : 'alert-danger ';
					var closableClass = closable ? 'alert-dismissable' : '';

					var box = $('<div class="alert ' + boxclass + closableClass + '"></div>')
					if (closable) {
							box.html($('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'));
					}

					var title = $('<strong>' + title + ' </strong>');
					return box.append(title).append(message);
			}
    }
}(jQuery);