'user strict'
angular.module("softtechApp")

.controller('HomeCtrl',['$scope','$http','toastr','$dataFactory',($scope, $http, toastr,$dataFactory)=>{
  $dataFactory.menuActive = "Home";
  console.log('HomeCtrl init');
}]);
