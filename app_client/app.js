(function(){

angular.module('nextreadApp', ['ngRoute', 'ngSanitize', 'dndLists', 'ngProgress']);

function config($routeProvider, $locationProvider, $location, authentication) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			resolve:{
		        'check': function($location, authentication) {
		            if(authentication.isLoggedIn() === true) {
		                $location.path('/booklist');
		            }
		        }
		    },
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
			resolve:{
		        'check': function($location, authentication) {
		            if(authentication.isLoggedIn() === false) {
		                $location.path('/');
		            }
		        }
		    },
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