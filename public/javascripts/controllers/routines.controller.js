'user strict'
angular.module("softtechApp")

.controller('RoutinesCtrl',['$scope','$http','$dataFactory',($scope, $http, $dataFactory)=>{
  $dataFactory.menuActive = "Rutinas";
  console.log('RoutinesCtrl init');
}]);
