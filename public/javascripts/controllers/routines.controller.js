'user strict'
angular.module("softtechApp")

.controller('RoutinesCtrl',['$scope','$http','toastr','$dataFactory',($scope, $http, toastr, $dataFactory)=>{
  $dataFactory.menuActive = "Rutinas";
  console.log('RoutinesCtrl init');
}]);
