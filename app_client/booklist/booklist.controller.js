(function(){

angular
	.module('nextreadApp')
	.controller('booklistCtrl', booklistCtrl);

function booklistCtrl(nextreadData, ngProgressFactory) {

	var vm = this;
	vm.pageHeader = {
		title: 'Nextread',
		strapline: 'Your books-to-read list'
	};

	vm.booklist = null;

	vm.progressbar = ngProgressFactory.createInstance();
	vm.progressbar.setColor('#158cba');

	vm.getData = function() {
		nextreadData.getBooks().then(
			function success(response) {
				vm.booklist = response.data;
				vm.progressbar.complete();
			},
			function error(e) {
				vm.progressbar.reset();
				vm.message = "Sorry, something went wrong" + e.data.message;
			}
		);
	};

	// init page
	vm.progressbar.start();
	vm.getData();
	

	function validateTitle(title) {
	    var re = /^[a-zA-Z0-9 ]+$/i;
	    return (re.test(title) && title.length < 51);
	};

	function validateAuthor(author) {
	    var re = /^[a-zA-Z ]+$/i;
	    return (re.test(author) && author.length < 51);
	};

	vm.onBookSubmit = function() {
		if (!vm.title) {
			vm.message = "Please enter a book title";
		} else if (!validateTitle(vm.title)) {
			vm.message = "Please enter a valid book title";
		} else if (vm.author && !validateAuthor(vm.author)) {
			vm.message = "Please enter a valid author name";
		} else {
			vm.progressbar.start();
			vm.postData();
		}
	};

	vm.postData = function() {
		nextreadData.postBook(vm.title, vm.author).then(
			function success(updatedBookshelf) {
				vm.booklist = updatedBookshelf.data;
				vm.message = "";
				vm.progressbar.complete();
			},
			function error(e) {
				vm.progressbar.reset();
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