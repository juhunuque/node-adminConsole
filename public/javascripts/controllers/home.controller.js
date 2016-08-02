'user strict'
angular.module("softtechApp")

.controller('HomeCtrl',['$scope','$http','$dataFactory',($scope, $http,$dataFactory)=>{
  $dataFactory.menuActive = "Home";
}]);
