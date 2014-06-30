'use strict';

// Declare app level module which depends on filters, and services
var App = angular.module('app', ['ngSanitize', 'ngResource', 'ui.router', 'simplePagination']).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise("/users");

	$stateProvider.state('users', {
		url: "/users", // root route
		views: {
			"mainView": {
				templateUrl: "partials/users.html",
				controller: 'usersCtrl'
			}
		}
	});

	// Without server side support html5 must be disabled.
	return $locationProvider.html5Mode(false);
}]);