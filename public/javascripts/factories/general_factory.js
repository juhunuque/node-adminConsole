'use strict';
angular.module('softtechApp')

.factory('$dataFactory',function(){

    var menuActive = {};
    const baseUrl = 'http://127.0.0.1:3000';

    var setLogin = (item)=>{sessionStorage.setItem('loginApp',JSON.stringify(item))};
    var getLogin = ()=>{return JSON.parse(sessionStorage.getItem('loginApp'))};
    var logout = ()=>{sessionStorage.clear()};
    var isLogged = ()=>{
      if(sessionStorage.getItem('loginApp')){
        return true;
      }else{
        return false;
      }
    };

    return {
        menuActive: menuActive,
        baseUrl: baseUrl,
        setLogin: setLogin,
        getLogin: getLogin,
        logout: logout,
        isLogged: isLogged
        };
})

.factory('uuid', function() {
    var svc = {
        new: function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+"000000000").substr(2,8);
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },

        empty: function() {
          return '00000000-0000-0000-0000-000000000000';
        }
    };

    return svc;
})

.factory('authInterceptor', function($location, $q, $window, $dataFactory) {

return {
    request: function(config) {
      config.headers = config.headers || {};
      if($dataFactory.isLogged()){
        config.headers.Authorization = 'Bearer '+$dataFactory.getLogin().appToken;
      }
      return config;
    }
  };
})
