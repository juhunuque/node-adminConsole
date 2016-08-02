'user strict'
angular.module("softtechApp")

.controller('ActivitiesCtrl',['$scope','$http', '$dataFactory', 'DTOptionsBuilder', 'Notification',($scope, $http, $dataFactory, DTOptionsBuilder, Notification)=>{
  $dataFactory.menuActive = "Actividades";

  // DataTables configurable options
  $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withDisplayLength(10)
      .withOption('bLengthChange', false)
      .withOption('autoWidth', true)
      .withOption('scrollY', "200px")
      .withOption('scrollCollapse', true);

  //Functions
  $scope.refresh = function(){
    $scope.formOpt = false;
    $scope.tablBtnsOpt = false;
    $scope.formDetailsOpt = false;
    $scope.addBtnOpt = true;
    $scope.delBtnOpt = false;
    $scope.itemActivated = {};

    // Get Data from server
    $http.get('/v1/activities').then(function(response){
        $scope.items = response.data;
    })
  };

  // Activate Form to modify or add data
  $scope.formActivate = function(item){
    if(item != null){ // Insert
      $scope.itemActivated = item;
    }else{ // Update
      $scope.delBtnOpt = true;
    }
    $scope.formOpt = true;
    $scope.tablBtnsOpt = true;
    $scope.addBtnOpt = false;

  };

  // Activate Form to modify or add data
  $scope.formDetailsActivate = function(item){
    $scope.itemActivated = item;
    $scope.formDetailsOpt = true;
    $scope.addBtnOpt = false;
    $scope.tablBtnsOpt = true;

  };

  $scope.validateEmptyData = function(item){
    return softechUtil.validateEmptyData(item);
  };

  // Remove an item
  $scope.removeItem = function(id){
    $http.delete('/v1/activities/'+id).then(function(response){
        Notification.success({title:'Exitoso', message:'Removido exitosamente!'});
        $scope.refresh();
    }, function(error){
      if(error.status === 400){
        Notification.error({title:'Error', message:'Por favor verifique sus datos y vuelva a intentarlo!'});
      }else if(error.status === 500){
        Notification.error({title:'Error', message:'Ocurrio un error en el servidor, intentelo mas tarde!'});
      }else{
        Notification.error({title:'Error', message:'Error desconocido, refresque la pagina y vuelva a intentarlo!'});
      }
      console.log('Error: ' + error.data.message);
      $scope.refresh();
    });
  };

  // Add a new Item
  $scope.addNewItem = function(){
    var data = {
      nombreActividad : softechUtil.validateEmptyData($scope.itemActivated.nombreActividad),
      detalle : softechUtil.validateEmptyData($scope.itemActivated.detalle),
      duracion : softechUtil.validateDataNumber($scope.itemActivated.duracion),
      repeticiones : softechUtil.validateDataNumber($scope.itemActivated.repeticiones),
      peso : softechUtil.validateDataNumber($scope.itemActivated.peso)
    };
    $http.post('/v1/activities/', data).then(function(response){
        Notification.success({title:'Exitoso', message:'Ingresado exitosamente!'});
        $scope.refresh();
    }, function(error){
      if(error.status === 400){
        Notification.error({title:'Error', message:'Por favor verifique sus datos y vuelva a intentarlo!'});
      }else if(error.status === 500){
        Notification.error({title:'Error', message:'Ocurrio un error en el servidor, intentelo mas tarde!'});
      }else{
        Notification.error({title:'Error', message:'Error desconocido, refresque la pagina y vuelva a intentarlo!'});
      }
      console.log('Error: ' + error.data.message);
      $scope.refresh();
    });
  };

  // Modify an existing item
  $scope.updateItem = function(){
    var data = {
      nombreActividad : softechUtil.validateEmptyData($scope.itemActivated.nombreActividad),
      detalle : softechUtil.validateEmptyData($scope.itemActivated.detalle),
      duracion : softechUtil.validateDataNumber($scope.itemActivated.duracion),
      repeticiones : softechUtil.validateDataNumber($scope.itemActivated.repeticiones),
      peso : softechUtil.validateDataNumber($scope.itemActivated.peso)
    };
    $http.put('/v1/activities/'+$scope.itemActivated._id, data).then(function(response){
        Notification.success({title:'Exitoso', message:'Modificado exitosamente!'});
        $scope.refresh();
    }, function(error){
      if(error.status === 400){
        Notification.error({title:'Error', message:'Por favor verifique sus datos y vuelva a intentarlo!'});
      }else if(error.status === 500){
        Notification.error({title:'Error', message:'Ocurrio un error en el servidor, intentelo mas tarde!'});
      }else{
        Notification.error({title:'Error', message:'Error desconocido, refresque la pagina y vuelva a intentarlo!'});
      }
      console.log('Error: ' + error.data.message);
      $scope.refresh();
    });
  };

  $scope.confirmChanges = function(){
    if(!$scope.delBtnOpt){
      $scope.updateItem();
    }else{
      $scope.addNewItem();
    }
  }

  $scope.refresh();

}]);
