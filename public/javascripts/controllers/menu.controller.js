'user strict'
angular.module("softtechApp")

.controller('MenuCtrl',['$scope', '$dataFactory',($scope, $dataFactory)=>{
  $scope.title = $dataFactory.menuActive;
  $scope.$watch(()=>{
    return $dataFactory.menuActive;
  },()=>{
    $scope.title = $dataFactory.menuActive;
    return;
  });
}]);
