'user strict'
angular.module("softtechApp")

.controller('UsersCtrl',['$scope','$http', '$dataFactory', 'DTOptionsBuilder', 'Notification','$filter',($scope, $http, $dataFactory, DTOptionsBuilder, Notification,$filter)=>{
  $dataFactory.menuActive = "Usuarios";

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
    $http.get('/v1/users').then(function(response){
        $scope.items = response.data;
    })

    // Get routines from server
    $http.get('/v1/routines').then(function(response){
        $scope.itemsList = response.data;
    })
  };

  // Activate Form to modify or add data
  $scope.formActivate = function(item){
    if(item != null){ // Update
      $scope.itemObjectActived = item;
      const dateAux = $filter('date')(item.fechaNacimiento, "MM/dd/yyyy");
      $scope.itemObjectActived.fechaNacimiento = dateAux;
      //$scope.itemsList = softechUtil.getArrayWithoutDuplicates( $scope.itemsList,$scope.itemObjectActived.rutinas );
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
    const dateAux = $filter('date')(item.fechaNacimiento, "MM/dd/yyyy");
    $scope.itemObjectActived.fechaNacimiento = dateAux;
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
    $http.delete('/v1/users/'+id).then(function(response){
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
      nombre: softechUtil.validateEmptyData($scope.itemObjectActived.nombre),
      apellidos: softechUtil.validateEmptyData($scope.itemObjectActived.apellidos),
      correo: softechUtil.validateEmptyData($scope.itemObjectActived.correo),
      fechaNacimiento: softechUtil.validateEmptyData($scope.itemObjectActived.fechaNacimiento),
      genero: softechUtil.validateEmptyData($scope.itemObjectActived.genero),
      foto: softechUtil.validateEmptyData($scope.itemObjectActived.foto),
      rutinas: $scope.itemObjectActived.rutinas
    };
    $http.post('/v1/users/', data).then(function(response){
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
      nombre: softechUtil.validateEmptyData($scope.itemObjectActived.nombre),
      apellidos: softechUtil.validateEmptyData($scope.itemObjectActived.apellidos),
      correo: softechUtil.validateEmptyData($scope.itemObjectActived.correo),
      fechaNacimiento: softechUtil.validateEmptyData($scope.itemObjectActived.fechaNacimiento),
      genero: softechUtil.validateEmptyData($scope.itemObjectActived.genero),
      foto: softechUtil.validateEmptyData($scope.itemObjectActived.foto),
      rutinas:$scope.itemObjectActived.rutinas
    };
    $http.put('/v1/users/'+$scope.itemObjectActived._id, data).then(function(response){
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

  // Compare if the action is an insert or update
  $scope.confirmChanges = function(){
    if(!$scope.delBtnOpt){
      $scope.updateItem();
    }else{
      $scope.addNewItem();
    }
  };

  // Add an item to routines array
  $scope.addListItem = function(){
    $scope.itemObjectActived.rutinas.push($scope.itemListSelected);
    $scope.itemListSelected = {};
  };

  // Remove an item from routines array
  $scope.removeListItem = function(item){
        let i = $scope.itemObjectActived.rutinas.indexOf(item);
        if(i != -1) {
            $scope.itemObjectActived.rutinas.splice(i, 1);
        }
    }
  $scope.refresh();
}]);
