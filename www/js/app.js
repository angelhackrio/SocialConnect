// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ngCordova','starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
      // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal.init("e8e191cf-c5b0-493e-a9b7-2aac93a7a4cf",
                                 {googleProjectNumber: "260207872252"},
                                 notificationOpenedCallback);
  
  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);
  });
      
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('app.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'mainContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      }
    }
  })
  
  .state('app.cadastro', {
    url: '/cadastro',
    views: {
      'mainContent': {
        templateUrl: 'templates/cadastro.html',
        controller: 'CadastroController'
      }
    }
  })
  
  .state('app.causas', {
    url: '/causas',
    views: {
      'mainContent': {
        templateUrl: 'templates/causas.html',
        controller: 'CausaController',
        resolve: {
            causas:  ['causasFactory', function(causasFactory){
                //var response = causasFactory.query();
                //return response.$promise;
                return causasFactory;
                /*response.$promise.then(function(data){
                    console.log("response");
                    console.log(data.dtos);
                    return data;
                });*/
              }]
          }
      }
    }
  })
  
  .state('app.ongsRelacionadas', {
    url: '/ongsRelacionadas',
    views: {
      'mainContent': {
        templateUrl: 'templates/ongsRelacionadas.html',
        controller: 'OngsRelacionadasController',
        resolve: {
            ongs:  ['ongFactory', function(ongFactory){
                return ongFactory;
              }]
          }
      }
    }
  })
  
  .state('app.ofertas', {
    url: '/ofertas',
    views: {
      'mainContent': {
        templateUrl: 'templates/ofertas.html',
        controller: 'OfertaController'
      }
    }
  })
  
  .state('app.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('app.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('app.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');

});
