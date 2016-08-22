angular.module('lol', ['ngRoute'])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/index.html',
      controller: 'LookupController'
    })
    .when('/search', {
      templateUrl: 'public/search'
    })
})
.controller('LookupController', function ($scope, $http) {
  $scope.summoner = {};
  $scope.champions = [];
  $scope.stats = {};
  $scope.lookUp = function(summName) {
    $scope.summoner['name'] = summName;
    return $http({
      method: 'POST',
      url: '/search',
      data: $scope.summoner
    }).then(function(data) {
      for(var key in data.data) {
        if(data.data[key].name !== undefined) {
          $scope.champions.push(data.data[key].name);
          $scope.stats[data.data[key].name] = data.data[key]
        } else {
          $scope.stats['total'] = data.data[key];
        }
      }
      console.log('summoner object inside app.js', $scope.stats['Ashe'])
    })
  }
  $scope.winRate = function(champion) {
    return ($scope.stats[champion].totalSessionsWon/$scope.stats[champion].totalSessionsPlayed * 100).toFixed(2);
  }

  $scope.kdaRatio = function(champion) {
    var champStats = $scope.stats[champion];
    return ((champStats.totalChampionKills+champStats.totalAssists)/champStats.totalDeathsPerSession).toFixed(2);
  }
});
