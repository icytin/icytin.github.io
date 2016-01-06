var ValidationHandler = function() {
	
	var _invalidField = function(textbox, message) {
		
		if (textbox.value == '' && textbox.required) {
			textbox.setCustomValidity(message);
		}
		else if (textbox.validity.typeMismatch){
			textbox.setCustomValidity('Formatet du angett är inte giltigt');
		}
		else {
		   textbox.setCustomValidity('');
		}
		
		return true;
	};
	
	return {
		invalidField: _invalidField
	};
	
}(jQuery);