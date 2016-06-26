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
      {codigo: 1, 
	categoria: 3, 
	descricao: "ARPEF", 
	texto: "A Associação de Reabilitação e Pesquisa Fonoaudiológica – ARPEF – é uma instituição civil, sem fins lucrativos, fundada em 1986 por uma equipe de profissionais das áreas de Fonoaudiologia, Psicologia e Psicopedagogia. Todos com especialização na Metodologia Verbotonal. ", 
	urlImagem: "http://www.arpef.org.br/img/logo.gif", 
	urlIcone: "http://www.arpef.org.br/img/logo.gif"}, 
{codigo: 2, 
	categoria: 4, 
	descricao: "Centro de Convivência para Idosos Vila do Sol", 
	texto: "O Residencial e Centro de Convivência para Idosos Vila do Sol é uma casa tranquila e confortável, onde você encontra: repouso, lazer, atividades terapêuticas, alimentação balanceada, socialização, cuidados, atenção e carinho.Temos acomodações confortáveis, estacionamento no ...", 
	urlImagem: "http://www.casaderepousoviladosol.com.br/hosting/imagens/7835116.png", 
	urlIcone: "http://www.casaderepousoviladosol.com.br/hosting/imagens/7835116.png"}, 
	{codigo: 3, 
		categoria: 2, 
		descricao: "TETO", 
		texto: "Instituição sem fins lucrativos cuja missão é favorecer o processo de transformação social por meio de trabalho socioeducativo junto às comunidades em situação de risco e exclusão, com atenção à criança e ao adolescente. Desde 1992, o Movimento tem concentrado seu trabalho ...",
		urlImagem: "http://www.techo.org/paises/brasil/wp-content/uploads/2014/01/Logo-TETO.png", 
		urlIcone: "http://www.techo.org/paises/brasil/wp-content/uploads/2014/01/Logo-TETO.png"}
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
