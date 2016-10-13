(function(){

angular.module('nextreadApp', ['ngRoute']);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('nextreadApp')
	.config(['$routeProvider', config]);

})();