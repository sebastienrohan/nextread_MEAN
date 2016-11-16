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
		return $http.post(
   			'/api/books',
   			{ title: postedTitle }
   		);
	};
	return {
		getBooks : getBooks,
		postBook : postBook
	};
}