(function(){

angular
	.module('nextreadApp')
	.controller('booklistCtrl', booklistCtrl);

function booklistCtrl(nextreadData, ngProgressFactory, $timeout) {

	var vm = this;
	vm.pageHeader = {
		title: 'Nextread',
		strapline: 'Your books-to-read list'
	};

	vm.booklist = null;
	vm.message = '';

	vm.progressbar = ngProgressFactory.createInstance();
	vm.progressbar.setColor('#4cafd6');
	vm.progressbar.setHeight('6px');

	vm.getData = function() {
		nextreadData.getBooks().then(
			function success(response) {
				temp_booklist = response.data;
				for (var b in temp_booklist) {
					temp_booklist[b].showDetails = false;
				}
				vm.booklist = temp_booklist;
				vm.progressbar.complete();
			},
			function error(e) {
				vm.progressbar.reset();
				vm.message = "Sorry, something went wrong: " + e.data.message;
			}
		);
	};

	// init page
	vm.progressbar.start();
	vm.getData();
	

	function validateTitle(title) {
	    var re = /^[a-zéèàùîôûâêA-Z0-9' ]+$/i;
	    return (re.test(title) && title.length < 51);
	}

	function validateAuthor(author) {
	    var re = /^[a-zéèàùîôûâêA-Z' ]+$/i;
	    return (re.test(author) && author.length < 51);
	}

	vm.onBookSubmit = function() {
		if (!vm.title) {
			vm.message = "Please enter a book title";
		} else if (!validateTitle(vm.title)) {
			vm.message = "Please enter a valid book title";
		} else if (vm.author && !validateAuthor(vm.author)) {
			vm.message = "Please enter a valid author name";
		} else {
			vm.message = '';
			vm.progressbar.start();
			vm.postData();
		}
	};

	vm.postData = function() {
		nextreadData.postBook(vm.title, vm.author).then(
			function success(updatedBookshelf) {
				vm.title = '';
				vm.author = '';
				vm.booklist = updatedBookshelf.data;
				vm.booklist[vm.booklist.length-1].new = true;
				$timeout(function() {
					vm.booklist[vm.booklist.length-1].new = false;
				}, 1000);
				vm.message = '';
				vm.progressbar.complete();
			},
			function error(e) {
				vm.progressbar.reset();
				vm.message = "Sorry, something went wrong: " + e.data.message;
			}
		);
	};

	vm.delete = function(bookToDelete) {
		nextreadData.deleteBook(bookToDelete).then(
			function success(updatedBookshelf) {
				for (var b in vm.booklist) {
					if (vm.booklist[b].title === bookToDelete) {
						vm.booklist[b].deleted = true;
					}
				}
				vm.message = '';
				$timeout(function() {
					vm.booklist = updatedBookshelf.data;
				}, 800);
			},
			function error(e) {
				vm.message = "Sorry, something went wrong: " + e.data.message;
			}
		);
	};

	vm.dragend = function(newBookshelf) {
		for (var b in newBookshelf) {
			newBookshelf[b].showDetails = false;
		}
		nextreadData.updateBookshelf(newBookshelf).then(
			function success() {
				console.log('Bookshelf updated in DB');
			},
			function error(e) {
				vm.message = "Sorry, something went wrong: " + e.data.message;
			}
		);
	};

}

})();