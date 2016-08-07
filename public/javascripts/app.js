'use strict';
var app = angular.module('softtechApp',['ngRoute','ngAnimate','datatables','ngAnimate','ui-notification','satellizer']);

app.config(['$routeProvider', '$authProvider', '$httpProvider',($routeProvider, $authProvider, $httpProvider)=>{
    // Adding interceptor for Headers
    $httpProvider.interceptors.push('authInterceptor');

    // Auth FB config
    $authProvider.facebook({
      clientId: '2086094091615811',
      responseType: 'token'
    });

  $routeProvider
  .when('/users',{
    templateUrl: 'views/users.view.html',
    controller: 'UsersCtrl',
    data: {requiredLogin: true}
  })
  .when('/home',{
    templateUrl: 'views/home.view.html',
    controller: 'HomeCtrl'
  })
  .when('/routines',{
    templateUrl: 'views/routines.view.html',
    controller: 'RoutinesCtrl'
  })
  .when('/activities',{
    templateUrl: 'views/activities.view.html',
    controller: 'ActivitiesCtrl'
  })
  .when('/login',{
    templateUrl: 'views/login.view.html',
    controller: 'LoginCtrl'
  })
  .otherwise({redirectTo: 'home'})
}]);

app.run(function ($rootScope, $location, $dataFactory, Notification) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (!$dataFactory.isLogged()){
        $location.url('/login');
      }
    });
  });
