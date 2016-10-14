(function(){

angular.module('nextreadApp', ['ngRoute']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}

angular
	.module('nextreadApp')
	.config(['$routeProvider', '$locationProvider', config]);

})();