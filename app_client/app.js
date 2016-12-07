(function(){

angular.module('nextreadApp', ['ngRoute', 'ngSanitize', 'dndLists', 'ngProgress']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.when('/register', {
			templateUrl: '/auth/register/register.view.html',
			controller: 'registerCtrl',
			controllerAs: 'vm'
		})
		.when('/login', {
			templateUrl: '/auth/login/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})
		.when('/booklist', {
			templateUrl: '/booklist/booklist.view.html',
			controller: 'booklistCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}

angular
	.module('nextreadApp')
	.config(['$routeProvider', '$locationProvider', config]);

})();