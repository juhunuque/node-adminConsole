angular.module("softtechApp")

.controller('HomeCtrl',['$scope','$http','$dataFactory',function($scope, $http,$dataFactory){
  $dataFactory.menuActive = "Home";
}]);
