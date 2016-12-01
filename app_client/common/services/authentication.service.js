(function () {
	
	angular
		.module('nextreadApp')
		.service('authentication', authentication);

	authentication.$inject = ['$http', '$window'];

	function authentication($http, $window) {

		var saveToken = function (token) {
			$window.localStorage['nextread-token'] = token;
		};

		var getToken = function () {
			return $window.localStorage['nextread-token'];
		};

		register = function (user) {
			return $http.post('/api/register', user).then(
				function success(response) {
					saveToken(response.data.token);
				}
			);
		};

		login = function (user) {
			return $http.post('/api/login', user).then(
				function success(response) {
					saveToken(response.data.token);
				}
			);
		};

		logout = function () {
			$window.localStorage.removeItem('nextread-token');
		};

		var isLoggedIn = function () {
			var token = getToken();

			if(token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		var currentUser = function () {
			if(isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email: payload.email
				};
			}
		};

		return {
			saveToken: saveToken,
			getToken: getToken,
			register: register,
			login: login,
			logout: logout,
			isLoggedIn: isLoggedIn,
			currentUser: currentUser
		};
	}

})();