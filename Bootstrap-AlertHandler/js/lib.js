var AlertHandler = function () {

    var self;

    return {
			AlertType: {
				Success: 0,
				Warning: 1,
				Error: 2,
				Info: 3
			},
			getAlert: function (alertType, title, message, closable) {
					var alertclass = alertType === this.AlertType.Warning ? 'alert-warning ' : alertType === this.AlertType.Success ? 'alert-success ' : alertType === this.AlertType.Info ? 'alert-info ' : 'alert-danger ';
					var closableClass = closable ? 'alert-dismissable' : '';

					var alert = $('<div class="alert ' + alertclass + closableClass + '"></div>')
					if (closable) {
							alert.html($('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'));
					}

					var title = $('<strong>' + title + ' </strong>');
					return alert.append(title).append(message);
			}
    }
}(jQuery);