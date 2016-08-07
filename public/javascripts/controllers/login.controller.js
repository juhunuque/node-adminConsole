'user strict'
angular.module("softtechApp")

.controller('LoginCtrl',['$scope','$dataFactory',($scope, $dataFactory)=>{
  if(!$dataFactory.isLogged()){
    $dataFactory.menuActive = "Debe loguearse para continuar...";
  }else{
    $dataFactory.menuActive = "Bienvenido "+$dataFactory.getLogin().name;
  }

  $scope.$watch(()=>{
    return $dataFactory.isLogged();
  },()=>{
    if(!$dataFactory.isLogged()){
      $dataFactory.menuActive = "Debe loguearse para continuar...";
    }else{
      $dataFactory.menuActive = "Bienvenido "+$dataFactory.getLogin().name;
    }
    return;
  });
}]);
