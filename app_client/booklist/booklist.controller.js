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
				vm.booklist = response.data;
			},
			function error(e) {
				vm.message = "Sorry, something went wrong" + e.data.message;
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
		nextreadData.postBook(vm.title, vm.author).then(
			function success(updatedBookshelf) {
				vm.booklist = updatedBookshelf.data;
				vm.message = "";
			},
			function error(e) {
				vm.message = "Sorry, something went wrong : " + e.data.message;
			}
		);
	};

	vm.delete = function(bookToDelete) {
		nextreadData.deleteBook(bookToDelete).then(
			function success(updatedBookshelf) {
				vm.booklist = updatedBookshelf.data;
				vm.message = "";
			},
			function error(e) {
				vm.message = "Sorry, something went wrong : " + e.data.message;
			}
		);
	};

	vm.dragend = function(newBookshelf) {
		nextreadData.updateBookshelf(newBookshelf).then(
			function success() {
				console.log('Bookshelf updated in DB');
			},
			function error(e) {
				vm.message = "Sorry, something went wrong : " + e.data.message;
			}
		);
	};

}

})();