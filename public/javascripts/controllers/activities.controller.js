'user strict'
angular.module("softtechApp")

.controller('ActivitiesCtrl',['$scope','$http','toastr', '$dataFactory', 'DTOptionsBuilder',($scope, $http, toastr, $dataFactory, DTOptionsBuilder)=>{
  $dataFactory.menuActive = "Actividades";
  console.log('ActivitiesCtrl init');

  // DataTables configurable options
  $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withDisplayLength(10)
      .withOption('bLengthChange', false)
      .withOption('autoWidth', false);

  $http.get('/v1/activities').then(function(response){
      $scope.items = response.data;
  })

}]);
