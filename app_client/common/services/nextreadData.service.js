angular
	.module('nextreadApp')
	.service('nextreadData', nextreadData);

function nextreadData($http) {
	var getBooks = function() {
		return $http.get('/api/books');
	};
	var postBook = function(postedTitle) {
console.log('http.posted postedTitle: ' + postedTitle);
		return $http.post(
   			'/api/books',
   			{title: postedTitle}
   		);
	};
	return {
		getBooks : getBooks,
		postBook : postBook
	};
}