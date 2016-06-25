angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginController', function($scope, $stateParams, $state) {
  //$scope.chat = Chats.get($stateParams.chatId);
 
  $scope.loginData = {};
    
  $scope.cadastrar =  function(){
      $state.go('app.cadastro');
  };    
    
  $scope.doLogin = function(){
      console.log("Fingindo um login");
      console.log($scope.loginData);
      
  };      
})

.controller('CadastroController', function($scope, $stateParams, $state) {
    $scope.cadastrar = function(){
        $state.go('app.causas');
    }
})

.controller('CausaController', function($scope, $stateParams, $state, causas) {
  $scope.causas = causas; 
  
  var causasSelecionadas = [];
    
  $scope.registrarItem = function(causa){
    
    var index = causasSelecionadas.indexOf(causa);
    console.log(index);
    if(index > -1) {
        causasSelecionadas.splice(index, 1);
    } else {
        causasSelecionadas.push(causa);
    }
    console.log(causasSelecionadas);
  }
    
    
  $scope.finalizar =  function(){
      //Registrar a zueira no back
      $state.go("app.ongsRelacionadas");
  }    
    
})

.controller('OngsRelacionadasController', function($scope, $state, $ionicPopup, ongs) {
  $scope.ongs = ongs;
  
  
  // An alert dialog
 $scope.obterDetalhes =  function(ong){
    console.log(ong);
    var alertPopup = $ionicPopup.alert({
     title: ong.descricao,
     template: 'Loereneiorneionei eins fsnefienf isnefi senfi seifn seifn seif sei fies feins finse inef i'
   });
    
 }})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
