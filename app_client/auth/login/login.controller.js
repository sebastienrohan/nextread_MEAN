(function() {
	
	angular
		.module('nextreadApp')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$location', 'authentication'];

	function loginCtrl($location, authentication) {
		var vm = this;

		vm.pageHeader = {
			title: 'Sign in to Nextread'
		};

		vm.credentials = {
			email: '',
			password: ''
		};

		vm.returnPage = '/';

		vm.onSubmit = function () {
			vm.formError = '';

			if (!vm.credentials.email || !vm.credentials.password) {
				vm.formError = 'All fields required, please try again';
				return false;
			} else {
				vm.doLogin();
			}
		};

		vm.doLogin = function () {
			vm.formError = '';
			authentication
				.login(vm.credentials)
				.then(
					function success() {
						$location.path(vm.returnPage);
					},
					function error(err) {
						vm.formError = err;
					}
				);
		};
	}

})();