
var app;
(function(){
  'use strict';
 var routes = routeApp.getRoutes();
  // Prepare the 'users' module for subsequent registration of controllers and delegates
  app = angular.module('users', [ 'ngMaterial','ngRoute' ]);

  app.config(['$routeProvider',
            function ($routeProvider) {
                angular.forEach(routes, function (values, key) {

                    var config = {

                        controller: values[0] + 'Controller',
                        templateUrl: values[1]
                    };
                   
                    $routeProvider.when(key, config);
                });
                 
                $routeProvider.otherwise({
                    redirectTo: '/'
                });
            }]);
  



})();
