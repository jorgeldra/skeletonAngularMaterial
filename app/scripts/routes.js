var routeApp = (function () {
    'use strict';

    var routes = {
       
        '/page2': [
            'User',
            'views/page2/page2.html',[
                'users/UserController.js',
                'users/UserService.js',
            ]
        ],
        '/': [
            'User',
            'views/material-angular/material-angular.html',[
                'users/UserController.js',
                'users/UserService.js',
            ]
        ]
     };

    function getRoutes() {
        return routes;
    }

    return {
        getRoutes: getRoutes
    }
}());