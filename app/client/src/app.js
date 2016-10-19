angular
  .module('todoApp', ['ngRoute'])
  .config(config);

function config($routeProvider) {
  $routeProvider
    .when('/access', {
      templateUrl: 'views/access.html',
      controller: 'accessCtrl',
      controllerAs: 'user',
    })
    .when('/lists', {
      templateUrl: 'views/lists.html',
      controller: 'listCtrl',
      controllerAs: 'lists',
    })
    .otherwise({ redirectTo: '/access' });
}
