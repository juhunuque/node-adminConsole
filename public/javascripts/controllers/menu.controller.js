angular.module("softtechApp")

.controller('MenuCtrl',['$scope', '$dataFactory', '$auth', '$http', 'Notification', '$location',function($scope, $dataFactory, $auth, $http, Notification, $location){
  $scope.itemObject = {};
  function refresh(){
    $scope.title = $dataFactory.menuActive;
    $scope.isLogged = $dataFactory.isLogged();
    if($dataFactory.isLogged()){
      $scope.email = $dataFactory.getLogin().email;
      $scope.picture = $dataFactory.getLogin().picture;
    }else{
      $scope.email = '';
      $scope.picture = '';
      $scope.itemObject = {};

    }
  }

  $scope.$watch(function(){
    return $dataFactory.menuActive;
  },function(){
    refresh();
    return;
  });

  // Functions
  $scope.loginFb = function(){
    $auth.authenticate('facebook').then(function(response){
      var data = {
        token: response.access_token
      };
      $http.post('/v1/security/loginFb', data).then(function(response){
          if(response.data.type !== 'admin'){
            Notification.error({title:'Error', message:'Error con login, el usuario no es administrador!'});
            return;
          }
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

  $scope.login = function(){
    var data = {
      email: $scope.itemObject.email,
      password: $scope.itemObject.password
    };
    $http.post('/v1/security/login', data).then(function(response){
        if(response.data.type !== 'admin'){
          Notification.error({title:'Error', message:'Error con login, el usuario no es administrador!'});
          return;
        }
        $dataFactory.setLogin(response.data)
        Notification.success({title:'Bienvenido', message:'Bienvenido '+response.data.name+'!'});
        refresh();
    }, function(error){
      Notification.error({title:'Error', message:'Error con login, refresque la pagina y vuelva a intentarlo!'});
      console.log('Error: ' + error.data.message);
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
