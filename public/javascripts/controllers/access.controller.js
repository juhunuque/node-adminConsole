'user strict'
angular.module("softtechApp")

.controller('AccessCtrl',['$scope','$http','toastr', '$dataFactory',($scope, $http, toastr, $dataFactory)=>{
  $dataFactory.menuActive = "Acceso";
  console.log('AccessCtrl init');
}]);
