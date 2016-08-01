'user strict'
angular.module("softtechApp")

.controller('MenuCtrl',['$scope','$http','toastr', '$dataFactory',($scope, $http, toastr, $dataFactory)=>{
  $scope.title = $dataFactory.menuActive;
  $scope.$watch(()=>{
    return $dataFactory.menuActive;
  },()=>{
    $scope.title = $dataFactory.menuActive;
    return;
  });
}]);
