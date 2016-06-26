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

.controller('CadastroController', function($scope, $stateParams, $state,$localStorage ,  $http, userFactory) {
   
    $scope.cadastro = {};
    
    $scope.cadastrar = function(){
        
        var config = {
                headers : {
                    'Content-Type': 'application/json;',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        
        $http({
            method: 'POST',
            url: 'http://10.18.242.109:8080/user',
            dataType: 'json',
            data: $scope.cadastro,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }})
           .success(function (data) {
            console.log(data);
            console.log(data.dto.password);
            $localStorage.storeObject('username', $scope.cadastro.username);
            $localStorage.storeObject('password', $scope.cadastro.password);
            
                $http({
                    method: 'POST',
                    url: 'http://10.18.242.109:8080/oauth/token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization' : 'Basic YXBwQ2xpZW50SWQ6c2VjcmV0'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {grant_type: 'password',username: $scope.cadastro.username, password: $scope.cadastro.password, client_id: 'appClientId'}
                }).success(function (data) {
                    console.log("Sucesso");
                    console.log(data);
                    $localStorage.storeObject('access_token', data.access_token);
                    $localStorage.storeObject('refresh_token', data.refresh_token);
                }).error(function (data) {
                    console.log("Erro");
                    console.log(data);
                });

        }).error(function (data) {
            console.log(data);
        });


        console.log($scope.cadastro);
        //userFactory.save($scope.cadastro);
      $state.go('app.causas');
    }
})

.controller('CausaController', function($scope, $stateParams, $state, causas) {
    
    
    //console.log("MANO");
    console.log(causas.dtos);
    $scope.causas = causas.dtos; 
    //console.log("oi");
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
     //title: ong.descricao,
     template: '<div class="list card"><div class="item item-avatar"><img src="https://pbs.twimg.com/profile_images/616359485381193728/zgJUwAY9.png"><h2>'+ong.descricao+'</h2><p></p></div><div class="item item-body"><img class="full-image" src="https://pbs.twimg.com/profile_images/616359485381193728/zgJUwAY9.png"><p>This is a "Facebook" styled Card. The header is created from a Thumbnail List item,the content is from a card-body consisting of an image and paragraph text. The footerconsists of tabs, icons aligned left, within the card-footer.</p><p><a href="#" class="subdued">Site</a><a href="#" class="subdued">Facebook</a></p></div></div>'
   });
    
 }

$scope.finalizar = function(){
    $state.go('app.ofertas');
}

})

.controller('OfertaController', function($scope, $state, $ionicModal) {

    $scope.ofertaSelecionada = {
      nome: "Teto",
      descricao: "lalalallaaa al allaallalala allala"
    };
    
    $ionicModal.fromTemplateUrl('templates/detalheOferta.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });
    
    $scope.exibirDetalhes = function(){
        
        
            $scope.modal.show();
        
    }
    
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
