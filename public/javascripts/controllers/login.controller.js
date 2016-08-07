angular.module("softtechApp")

.controller('LoginCtrl',['$scope','$dataFactory',function($scope, $dataFactory){
  if(!$dataFactory.isLogged()){
    $dataFactory.menuActive = "Debe loguearse para continuar...";
  }else{
    $dataFactory.menuActive = "Bienvenido "+$dataFactory.getLogin().name;
  }

  $scope.$watch(function(){
    return $dataFactory.isLogged();
  },function(){
    if(!$dataFactory.isLogged()){
      $dataFactory.menuActive = "Debe loguearse para continuar...";
    }else{
      $dataFactory.menuActive = "Bienvenido "+$dataFactory.getLogin().name;
    }
    return;
  });
}]);
