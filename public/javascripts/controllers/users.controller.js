'user strict'
angular.module("softtechApp")

.controller('UsersCtrl',['$scope','$http','$dataFactory',($scope, $http,$dataFactory)=>{
  $dataFactory.menuActive = "Usuarios";
  console.log('UsersCtrl init');
}]);
