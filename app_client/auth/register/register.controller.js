(function() {
	
	angular
		.module('nextreadApp')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$location', 'authentication'];

	function registerCtrl($location, authentication) {
		var vm = this;

		vm.pageHeader = {
			title: 'Create a new Nextread account'
		};

		vm.credentials = {
			email: '',
			password: ''
		};

		vm.returnPage = '/booklist';

		function validateEmail(email) {
		    var re = /\S+@\S+\.\S+/;
		    return re.test(email);
		};

		vm.onSubmit = function () {
			vm.formError = '';

			if (!vm.credentials.email || !validateEmail(vm.credentials.email) || !vm.credentials.password) {
				vm.formError = 'All fields required, please try again';
				return false;
			} else {
				vm.doRegister();
			}
		};

		vm.doRegister = function () {
			vm.formError = '';
			authentication
				.register(vm.credentials)
				.then(
					function success() {
						$location.path(vm.returnPage);
					},
					function error(err) {
						vm.formError = 'An account with this email already exists, please try again';
					}
				);
		};
	}

})();