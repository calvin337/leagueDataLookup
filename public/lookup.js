angular.module('lol.lookup')

.controller('LookupController', function ($scope, $location, $http) {
  $scope.summoner = {};
  $scope.lookUp = function(summName) {
    console.log(summName);
    console.log($scope.summoner)
    // $scope.summoner['name'] = summName;

    return $http({
      method: 'POST',
      url: '/search',
      data: $scope.summoner
    })
    .then(function (resp) {
      console.log(resp.data)
      return resp.data;
    });
  }
});
