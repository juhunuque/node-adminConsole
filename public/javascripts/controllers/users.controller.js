'user strict'
angular.module("softtechApp")

.controller('UsersCtrl',['$scope','$http','toastr','$dataFactory',($scope, $http, toastr,$dataFactory)=>{
  $dataFactory.menuActive = "Usuarios";
  console.log('UsersCtrl init');
}]);
