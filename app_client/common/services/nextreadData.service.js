angular
	.module('nextreadApp')
	.service('nextreadData', nextreadData);

nextreadData.$inject = ['$http', 'authentication'];

function nextreadData($http, authentication) {

	var getBooks = function() {
		return $http.get('/api/books', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var postBook = function(postedTitle) {
		var req = {
		    url: '/api/books',
		    method: 'POST',
		    json: true,
		    headers: {
		        "content-type": "application/json",
				Authorization: 'Bearer ' + authentication.getToken()
			},
		    data: { title: postedTitle }
		};
		return $http(req);
	};

	return {
		getBooks: getBooks,
		postBook: postBook
	};
}