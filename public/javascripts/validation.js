$('#addBook').submit(function (e) {
	if (!$('input#title').val()) {
		return false;
	}
});