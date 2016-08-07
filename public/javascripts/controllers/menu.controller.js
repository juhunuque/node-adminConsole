angular.module("softtechApp")

.controller('MenuCtrl',['$scope', '$dataFactory', '$auth', '$http', 'Notification', '$location',function($scope, $dataFactory, $auth, $http, Notification, $location){

  function refresh(){
    $scope.title = $dataFactory.menuActive;
    $scope.isLogged = $dataFactory.isLogged();
    if($dataFactory.isLogged()){
      $scope.email = $dataFactory.getLogin().email;
      $scope.picture = $dataFactory.getLogin().picture;
    }else{
      $scope.email = '';
      $scope.picture = '';

    }
  }

  $scope.$watch(function(){
    return $dataFactory.menuActive;
  },function(){
    refresh();
    return;
  });

  // Functions
  $scope.login = function(){
    $auth.authenticate('facebook').then(function(response){
      var data = {
        token: response.access_token
      };
      $http.post('/v1/security/login', data).then(function(response){
          $dataFactory.setLogin(response.data)
          Notification.success({title:'Bienvenido', message:'Bienvenido '+response.data.name+'!'});
          refresh();
      }, function(error){
        Notification.error({title:'Error', message:'Error con login, refresque la pagina y vuelva a intentarlo!'});
        console.log('Error: ' + error.data.message);
        refresh();
      });
    },function(error){
      Notification.error({title:'Error', message:'Ocurrio un error con su login!'});
      console.error(error);
      refresh();
    });
  };

  $scope.logout = function(){
    $dataFactory.logout();
    refresh();
    Notification.info({title:'Info', message:'Hasta pronto!'});
    $location.url('/login');
  }


}]);
