'user strict'
angular.module("softtechApp")

.controller('RoutinesCtrl',['$scope','$http', '$dataFactory', 'DTOptionsBuilder', 'Notification',($scope, $http, $dataFactory, DTOptionsBuilder, Notification)=>{
  $dataFactory.menuActive = "Rutinas";

  // DataTables configurable options
  $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withDisplayLength(10)
      .withOption('bLengthChange', false)
      .withOption('autoWidth', true)
      .withOption('scrollY', "200px")
      .withOption('oLanguage', {"sEmptyTable": "No hay datos..." })
      .withOption('scrollCollapse', true);

  //Functions
  $scope.refresh = function(){
    $scope.formOpt = false;
    $scope.tablBtnsOpt = false;
    $scope.formDetailsOpt = false;
    $scope.addBtnOpt = true;
    $scope.delBtnOpt = false;
    $scope.itemObjectActived = {}; // Item got it from datatable
    $scope.itemListSelected = {}; // Item got it from dropdown

    // Get Data from server
    $http.get('/v1/routines').then(function(response){
        $scope.items = response.data;
    })

    // Get activities from server
    $http.get('/v1/activities').then(function(response){
        $scope.itemsList = response.data;
    })
  };

  // Activate Form to modify or add data
  $scope.formActivate = function(item){
    if(item != null){ // Update
      $scope.itemObjectActived = item;
      //$scope.itemsList = softechUtil.getArrayWithoutDuplicates( $scope.itemsList,$scope.itemObjectActived.actividades );
    }else{ // Insert
      $scope.delBtnOpt = true;
    }
    $scope.formOpt = true;
    $scope.tablBtnsOpt = true;
    $scope.addBtnOpt = false;
  };

  // Activate Form to modify or add data
  $scope.formDetailsActivate = function(item){
    $scope.itemObjectActived = item;
    $scope.formDetailsOpt = true;
    $scope.addBtnOpt = false;
    $scope.tablBtnsOpt = true;

  };

  $scope.validateEmptyData = function(item){
    return softechUtil.validateEmptyData(item);
  };

  $scope.validateNumberData = function(item){
    return softechUtil.validateDataNumber(item);
  }

  // Remove an item
  $scope.removeItem = function(id){
    $http.delete('/v1/routines/'+id).then(function(response){
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
      nombreRutina: softechUtil.validateEmptyData($scope.itemObjectActived.nombreRutina),
      rondas: softechUtil.validateDataNumber($scope.itemObjectActived.duracion),
      detalle: softechUtil.validateEmptyData($scope.itemObjectActived.detalle),
      tiempoTotal:softechUtil.validateDataNumber($scope.itemObjectActived.tiempoTotal),
      tiempoEntreActividades: softechUtil.validateDataNumber($scope.itemObjectActived.tiempoEntreActividades),
      tiempoEntreRondas: softechUtil.validateDataNumber($scope.itemObjectActived.tiempoEntreRondas),
      reqTiempo: softechUtil.validateDataNumber($scope.itemObjectActived.reqTiempo),
      reqPeso: softechUtil.validateDataNumber($scope.itemObjectActived.reqPeso),
      reqCant: softechUtil.validateDataNumber($scope.itemObjectActived.reqCant),
      tema: softechUtil.validateDataNumber($scope.itemObjectActived.tema),
      actividades: $scope.itemObjectActived.actividades
    };
    $http.post('/v1/routines/', data).then(function(response){
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
      nombreRutina: softechUtil.validateEmptyData($scope.itemObjectActived.nombreRutina),
      rondas: softechUtil.validateDataNumber($scope.itemObjectActived.duracion),
      detalle: softechUtil.validateEmptyData($scope.itemObjectActived.detalle),
      tiempoTotal:softechUtil.validateDataNumber($scope.itemObjectActived.tiempoTotal),
      tiempoEntreActividades: softechUtil.validateDataNumber($scope.itemObjectActived.tiempoEntreActividades),
      tiempoEntreRondas: softechUtil.validateDataNumber($scope.itemObjectActived.tiempoEntreRondas),
      reqTiempo: softechUtil.validateDataNumber($scope.itemObjectActived.reqTiempo),
      reqPeso: softechUtil.validateDataNumber($scope.itemObjectActived.reqPeso),
      reqCant: softechUtil.validateDataNumber($scope.itemObjectActived.reqCant),
      tema: softechUtil.validateDataNumber($scope.itemObjectActived.tema),
      actividades: $scope.itemObjectActived.actividades
    };
    $http.put('/v1/routines/'+$scope.itemObjectActived._id, data).then(function(response){
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

  // Add an item to routines array
  $scope.addListItem = function(){
    $scope.itemObjectActived.actividades.push($scope.itemListSelected);
    $scope.itemListSelected = {};
  };

  // Remove an item from routines array
  $scope.removeListItem = function(item){
        let i = $scope.itemObjectActived.actividades.indexOf(item);
        if(i != -1) {
            $scope.itemObjectActived.actividades.splice(i, 1);
        }
    }

  $scope.refresh();
}]);
