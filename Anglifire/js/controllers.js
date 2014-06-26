'use strict';

/* Controllers */

angular.module('anglifierApp.controllers', [])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
      $scope.title = 'Welcome!';
      $scope.message = 'This is Anglifire - A AngularJS template project';
   }])
   
    .controller('htmlController', function($scope, $routeParams, $route, $location) {
      $scope.$watch(function() {
        if($route.current !== undefined) {
          return $route.current.css + ($route.current.js === undefined ? '' : (";" + $route.current.js));
        }
        
        return '';
      },
      function(value) {
        if(value !== undefined) {
          var vs = value.split(';');
          $scope.css = '';
          $scope.js = '';
          if(vs.length !== 0) {
            $scope.css = vs[0];
            if(vs.length > 1) {
              $scope.js = vs[1];
            }
          }
        }
      });
      
      $scope.isActive = function (viewLocation, a) { 
        return viewLocation === location.hash;
      };
    })
   
   .controller('aboutController', function($scope) {
      $scope.message = 'What is Anglifire? Anglifire is a template designed to easily get started with a AngularJS project.';
    })

    .controller('contactController', function($scope) {
      $scope.message = 'Contact us!';
    })

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', function($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
      $scope.syncAccount = function() {
         $scope.user = {};
         syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
            $scope.unBindAccount = unBind;
         });
      };
      // set initial binding
      $scope.syncAccount();

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
         $scope.emailerr = null;
         $scope.emailmsg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      $scope.updateEmail = function() {
        $scope.reset();
        // disable bind to prevent junk data being left in firebase
        $scope.unBindAccount();
        changeEmailService(buildEmailParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         };
      }
      function buildEmailParms() {
         return {
            newEmail: $scope.newemail,
            pass: $scope.pass,
            callback: function(err) {
               if( err ) {
                  $scope.emailerr = err;
                  // reinstate binding
                  $scope.syncAccount();
               }
               else {
                  // reinstate binding
                  $scope.syncAccount();
                  $scope.newemail = null;
                  $scope.pass = null;
                  $scope.emailmsg = 'Email updated!';
               }
            }
         };
      }

   }])

   // Map test ===========================================
  .controller('MapCtrl', function ($scope) {
  
       
      var offices = [
          {
              city : 'Stockholm',
              desc : 'Kungliga slottet, Gamla stan',
              lat : 59.3254581,
              long : 18.0713114
          }
          // , {}, ...
      ];

      var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(59.3254581, 18.0713114),
          mapTypeId: google.maps.MapTypeId.TERRAIN
      }

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      $scope.markers = [];
      
      var infoWindow = new google.maps.InfoWindow();
      
      var createMarker = function (info){
          
          var marker = new google.maps.Marker({
              map: $scope.map,
              position: new google.maps.LatLng(info.lat, info.long),
              title: info.city
          });
          marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
          
          google.maps.event.addListener(marker, 'click', function(){
              infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
              infoWindow.open($scope.map, marker);
          });
          
          $scope.markers.push(marker);
          
      }  
      
      for (var i = 0; i < offices.length; i++){
          createMarker(offices[i]);
      }

      $scope.openInfoWindow = function(e, selectedMarker){
          e.preventDefault();
          google.maps.event.trigger(selectedMarker, 'click');
      }
      
      google.maps.event.trigger($scope.map, "resize");

  });