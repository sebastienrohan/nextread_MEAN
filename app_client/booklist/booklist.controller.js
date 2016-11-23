(function(){

angular
	.module('nextreadApp')
	.controller('booklistCtrl', booklistCtrl);

function booklistCtrl(nextreadData) {

	var vm = this;
	vm.pageHeader = {
		title: 'Nextread',
		strapline: 'Your books-to-read list'
	};

	vm.booklist = null;

	vm.getData = function() {
		nextreadData.getBooks().then(
			function success(response) {
				vm.message = response.data.length > 0 ? "" : "No books found";
				vm.data = { books: response.data };
				vm.booklist = response.data;
			},
			function error(e) {
				vm.message = "Sorry, something went wrong";
			}
		);
	};
	vm.getData();

	vm.onBookSubmit = function() {
		if (!vm.title) {
			vm.message = "Please enter a book title";
		} else {
			vm.postData();
		}
	};

	vm.postData = function() {
		nextreadData.postBook(vm.title).then(
			function success(addedBook) {
				vm.booklist.push(addedBook.data);
				vm.data = { books: vm.booklist };
			},
			function error(e) {
				vm.message = "Sorry, something went wrong : " + e.data.message;
			}
		);
	};
}

})();