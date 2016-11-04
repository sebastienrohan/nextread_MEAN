(function(){

angular
	.module('nextreadApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl(nextreadData) {
	var vm = this;
	vm.pageHeader = {
		title: 'Nextread',
		strapline: 'Your books-to-read list'
	};

	vm.getData = function() {
		console.log("getData called");
		vm.message = "Loading your book list";
		nextreadData.getBooks().then(
			function success(response) {
				vm.message = response.data.length > 0 ? "" : "No books found";
				vm.data = { books: response.data };
			},
			function error(e) {
				vm.message = "Sorry, something went wrong";
			}
		);
	};
	vm.getData();

	vm.postData = function() {
console.log("postData called: " + vm.title);
		vm.message = "Posting your book title: " + vm.title;
		nextreadData.postBook(vm.title).then(
			function success() {
console.log("postData success: " + vm.title);
				vm.getData();
			},
			function error(e) {
				vm.message = "Sorry, something went wrong: ";
			}
		);
	};
}

})();