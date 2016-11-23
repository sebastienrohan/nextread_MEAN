(function () {

	angular
		.module('nextreadApp')
		.controller('navigationCtrl', navigationCtrl);

	navigationCtrl.$inject = ['$location','authentication'];

	function navigationCtrl($location, authentication) {
		
		var vm = this;

		vm.isLoggedIn = authentication.isLoggedIn();

		vm.home = function () {
			if (vm.isLoggedIn) {
				$location.path('/booklist');
			} else {
				$location.path('/');
			}
		};

		vm.logout = function () {
			authentication.logout();
			$location.path('/');
		};
	};

})();