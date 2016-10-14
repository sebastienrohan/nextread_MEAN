(function(){

angular
	.module('nextreadApp')
	.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$http'];

function homeCtrl($http) {
	var vm = this;
	vm.pageHeader = {
		title: 'Nextread',
		strapline: 'Your books-to-read list'
	};
	vm.message = "Loading your book list";

	// A remplacer par une interrogation du service nextreadData qui contiendra ce code (à peu près)
	$http.get('/api/books').then(
		function success(response) {
			vm.message = response.data.length > 0 ? "" : "No books found";
			vm.data = { books: response.data };
		},
		function error(e) {
			vm.message = "Sorry, something went wrong";
		}
	);
}

})();