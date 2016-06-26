angular.module('starter.services', ['ngResource'])
.constant("baseURL","http://10.18.242.109:8080/")

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('causasFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
  /*return $resource(baseURL + "causa",
      { q: '*' }, // Query parameters
      {'query': { method: 'GET' }});*/
    var causas = [
      {codigo: 1, descricao: "Moradia popular"},
      {codigo: 2, descricao: "Doações"},
      {codigo: 3, descricao: "Crianças"},
      {codigo: 4, descricao: "Idosos"}    
  ];
  return causas;
}])

.factory('userFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
  return $resource(baseURL + "user");
}])


.factory('ongFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
  //return $resource(baseURL + "causas");
  var ongs = [
      {codigo: 1, categoria: 1, descricao: "GRAAC", texto: "Lorem pasdasdansi asoidn nasdionadoinas das", urlImagem:"", urlIcone:""},
      {codigo: 2, categpria: 2, descricao: "Fundação Cafú", text: "asdiadioahsidaiosdh iohdoasd", urlImagem:"", urlIcone:""}
  ];
  return ongs;
}])


.factory('$localStorage', ['$window', function($window) {
  return {
    store: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key,defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }
  }
}]);
