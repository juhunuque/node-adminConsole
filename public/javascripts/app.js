'use strict';
var app = angular.module('softtechApp',['ngRoute','ngAnimate','toastr']);

app.config(['$routeProvider', ($routeProvider)=>{
  $routeProvider
  .when('/users',{
    templateUrl: 'views/users.view.html',
    controller: 'UsersCtrl'
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
  .when('/access',{
    templateUrl: 'views/access.view.html',
    controller: 'AccessCtrl'
  })
  .otherwise({redirectTo: 'home'})
}]);
