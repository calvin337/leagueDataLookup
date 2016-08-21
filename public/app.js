angular.module('lol', ['ngRoute'])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/index.html',
      controller: 'LookupController'
    })
    .when('/lookup', {
      templateUrl: 'public/lookup.html',
    })
    .when('/search', {
      templateUrl: 'public/search'
    })
})
.controller('LookupController', function ($scope, $http) {
  $scope.summoner = {};
  $scope.champions = [];
  $scope.lookUp = function(summName) {
    $scope.summoner['name'] = summName;
    return $http({
      method: 'POST',
      url: '/search',
      data: $scope.summoner
    }).then(function(data) {
      console.log(data)
      $scope.champions = data.data; 
    })
  }
});
