(function(){

angular
	.module('nextreadApp')
	.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$location'];

function homeCtrl($location) {

	var vm = this;

	vm.pageHeader = {
		title: 'Nextread',
		strapline: 'Your books-to-read list'
	};

	vm.register = function () {
		$location.path('/register');
	};

	vm.login = function () {
		$location.path('/login');
	};

}

})();