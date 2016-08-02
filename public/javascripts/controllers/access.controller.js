'user strict'
angular.module("softtechApp")

.controller('AccessCtrl',['$scope','$http', '$dataFactory',($scope, $http, $dataFactory)=>{
  $dataFactory.menuActive = "Acceso";
  console.log('AccessCtrl init');
}]);
