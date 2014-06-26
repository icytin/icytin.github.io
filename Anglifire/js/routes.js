"use strict";

angular.module('anglifierApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider, $locationProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller : 'HomeCtrl',
         css        : 'css/home/index.css'
         // js         : 'js/page/home/main.js'
      })
      
      // route for the about page
			.when('/about', {
				templateUrl : 'partials/about.html',
				controller  : 'aboutController',
        css         : 'css/about/index.css'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'partials/contact.html',
				controller  : 'contactController',
        css         : 'css/contact/index.css'
			})

      .when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller : 'AccountCtrl',
         css        : 'css/account/index.css'
      })

      .when('/login', {
         templateUrl: 'partials/login.html',
         controller : 'LoginCtrl',
         css        : 'css/login/index.css'
      })

      .otherwise({redirectTo: '/home'});
      
      // use the HTML5 History API. This is a simple way to get pretty URLs and remove the hashtag in your Angular application.
      // $locationProvider.html5Mode(true);
      
   }]);