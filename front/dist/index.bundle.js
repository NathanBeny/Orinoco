/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./controllers/main.js":
/*!*****************************!*\
  !*** ./controllers/main.js ***!
  \*****************************/
/*! exports provided: getProduits, annulerProduit, addition, checkInput, resultOrder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getProduits\", function() { return getProduits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"annulerProduit\", function() { return annulerProduit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addition\", function() { return addition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkInput\", function() { return checkInput; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resultOrder\", function() { return resultOrder; });\nvar produitSell = 'cameras'; //Au choix entre : \"cameras meubles pelluche\"\n\nvar APIURL = 'http://localhost:3000/api/' + produitSell + '/'; //id produit => choix des different produit\n\nvar error = '';\nvar idProduit = '';\nvar demo = document.getElementById('dodo');\n/*L'utilisateur à besoin d'un panier dans localStorage\r\nSi le panier existe dans le localStorage ok, else créer et l'envoyer dans le localStorage **************************************************/\n\nif (localStorage.getItem('userPanier')) {\n  // console.log(localStorage);\n  console.log(\"Administration : le panier de l'utilisateur existe dans le localStorage\");\n} else {\n  console.log(\"Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage\"); //Le panier est un tableau de produits\n\n  var panierInit = [];\n  localStorage.setItem('userPanier', JSON.stringify(panierInit));\n} //Tableau et objet demandé par l'API pour la commande\n\n\nvar contact;\nvar products = []; //L'user a maintenant un panier\n\nvar userPanier = JSON.parse(localStorage.getItem('userPanier'));\n/* API appel\r\n ******************************************************************************************************************************************************/\n\nvar getProduits = function getProduits() {\n  return new Promise(function (resolve) {\n    var request = new XMLHttpRequest();\n\n    request.onreadystatechange = function () {\n      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {\n        resolve(JSON.parse(this.responseText));\n        console.log('Administration : connection ok'); //L'appel est réussi => suppression des message d'erreur\n\n        error = document.getElementById('error'); //On supprime le message d'erreur s'il existe\n\n        if (error) {\n          error.remove();\n        }\n      } else {\n        console.log('Administration : ERROR connection API');\n      }\n    };\n\n    request.open('GET', APIURL + idProduit);\n    request.send();\n  });\n}; //Supprimer un produit du panier\n\n\nvar annulerProduit = function annulerProduit(i) {\n  console.log(\"Administration : Enlever le produit à l'index \" + i); //recupérer le array\n\n  userPanier.splice(i, 1);\n  console.log('Administration : ' + userPanier); //vide le localstorage\n\n  localStorage.clear();\n  console.log('Administration : localStorage vidé'); // mettre à jour le localStorage avec le nouveau panier\n\n  localStorage.setItem('userPanier', JSON.stringify(userPanier));\n  console.log('Administration : localStorage mis à jour'); //relancer la création de l'addition\n\n  window.location.reload();\n};\n\nvar addition = function addition() {\n  //Vérifie si un prduit est dans le panier\n  if (JSON.parse(localStorage.getItem('userPanier')).length > 0) {\n    //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif\n    document.getElementById('panierVide').remove(); //Création de la structure principale du tableau\n\n    var facture = document.createElement('table');\n    var ligneTableau = document.createElement('tr');\n    var colonneNom = document.createElement('th');\n    var prixUnitaire = document.createElement('th');\n    var colonneRemove = document.createElement('th');\n    var ligneTotal = document.createElement('tr');\n    var colonneRefTotal = document.createElement('th');\n    var prixPay = document.createElement('td'); //Placement de la structure dans la page et du contenu des entetes\n\n    var factureSection = document.getElementById('panier-resume');\n    factureSection.appendChild(facture);\n    facture.appendChild(ligneTableau);\n    ligneTableau.appendChild(colonneNom);\n    colonneNom.textContent = 'Nom du produit';\n    ligneTableau.appendChild(prixUnitaire);\n    prixUnitaire.textContent = 'Prix du produit'; //Pour chaque produit du panier, on créé une ligne avec le nom, le prix\n    //Init de l'incrémentation de l'id des lignes pour chaque produit\n\n    var i = 0;\n    JSON.parse(localStorage.getItem('userPanier')).forEach(function (produit) {\n      //Création de la ligne\n      var ligneProduit = document.createElement('tr');\n      var nomProduit = document.createElement('td');\n      var prixUnitProduit = document.createElement('td');\n      var removeProduit = document.createElement('i'); //Attribution des class pour le css\n\n      ligneProduit.setAttribute('id', 'produit' + i);\n      removeProduit.setAttribute('id', 'remove' + i);\n      removeProduit.setAttribute('class', 'fas fa-trash-alt annulerProduit'); //Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit\n      //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event\n      //annulerProduit L233\n\n      removeProduit.addEventListener('click', annulerProduit.bind(i));\n      i++; //Insertion dans le HTML\n\n      facture.appendChild(ligneProduit);\n      ligneProduit.appendChild(nomProduit);\n      ligneProduit.appendChild(prixUnitProduit);\n      ligneProduit.appendChild(removeProduit); //Contenu des lignes\n\n      nomProduit.innerHTML = produit.name;\n      prixUnitProduit.textContent = produit.price / 100 + ' €';\n    }); //Dernière ligne du tableau : Total\n\n    facture.appendChild(ligneTotal);\n    ligneTotal.appendChild(colonneRefTotal);\n    colonneRefTotal.textContent = 'Total à payer';\n    ligneTotal.appendChild(prixPay);\n    prixPay.setAttribute('id', 'sommeTotal'); //Calcule de l'addition total\n\n    var totalPaye = 0;\n    JSON.parse(localStorage.getItem('userPanier')).forEach(function (produit) {\n      totalPaye += produit.price / 100;\n    }); //Affichage du prix total à payer dans l'addition\n\n    console.log('Administration : ' + totalPaye);\n    document.getElementById('sommeTotal').textContent = totalPaye + ' €';\n  }\n};\n/*Formulaire et vérif etat panier\r\n **********************************************/\n//vérifie les inputs du formulaire\n\n\nvar checkInput = function checkInput() {\n  //Controle Regex\n  var checkString = /[a-zA-Z]/;\n  var checkNumber = /[0-9]/; //Source pour vérification email => emailregex.com\n\n  var checkMail = new RegExp(\"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21\\\\x23-\\\\x5b\\\\x5d-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])*\\\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\\\x01-\\\\x08\\\\x0b\\\\x0c\\\\x0e-\\\\x1f\\\\x21-\\\\x5a\\\\x53-\\\\x7f]|\\\\\\\\[\\\\x01-\\\\x09\\\\x0b\\\\x0c\\\\x0e-\\\\x7f])+)\\\\])\", \"y\");\n  var checkSpecialCharacter = /[§!@#$%^&*(),.?\":{}|<>]/; //message fin de controle\n\n  var checkMessage = ''; //Récupération des inputs\n\n  var formNom = document.getElementById('formNom').value;\n  var formPrenom = document.getElementById('formPrenom').value;\n  var formMail = document.getElementById('formMail').value;\n  var formAdresse = document.getElementById('formAdresse').value;\n  var formVille = document.getElementById('formVille').value; //tests des différents input du formulaire\n  //Test du nom => aucun chiffre ou charactère spécial permis\n\n  if (checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == '') {\n    checkMessage = 'Vérifier/renseigner votre nom';\n  } else {\n    console.log('Administration : Nom ok');\n  } //Test du nom => aucun chiffre ou charactère spécial permis\n\n\n  if (checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == '') {\n    checkMessage = checkMessage + '\\n' + 'Vérifier/renseigner votre prénom';\n  } else {\n    console.log('Administration : Prénom ok');\n  } //Test du mail selon le regex de la source L256\n\n\n  if (checkMail.test(formMail) == false) {\n    checkMessage = checkMessage + '\\n' + 'Vérifier/renseigner votre email';\n  } else {\n    console.log('Administration : Adresse mail ok');\n  } //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux\n\n\n  if (checkSpecialCharacter.test(formAdresse) == true || formAdresse == '') {\n    checkMessage = checkMessage + '\\n' + 'Vérifier/renseigner votre adresse';\n  } else {\n    console.log('Administration : Adresse ok');\n  } //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux\n\n\n  if (checkSpecialCharacter.test(formVille) == true && checkNumber.test(formVille) == true || formVille == '') {\n    checkMessage = checkMessage + '\\n' + 'Vérifier/renseigner votre ville';\n  } else {\n    console.log('Administration : Ville ok');\n  } //Si un des champs n'est pas bon => message d'alert avec la raison\n\n\n  if (checkMessage != '') {\n    alert('Il est nécessaire de :' + '\\n' + checkMessage);\n  } //Si tout est ok construction de l'objet contact => a revoir\n  else {\n      contact = {\n        firstName: formNom,\n        lastName: formPrenom,\n        address: formAdresse,\n        city: formVille,\n        email: formMail\n      };\n      return contact;\n    }\n};\n/*Affichage des informations sur la page de confirmation\r\n **********************************************/\n\n\nvar resultOrder = function resultOrder() {\n  if (sessionStorage.getItem('order') != null) {\n    //Parse du session storage\n    var order = JSON.parse(sessionStorage.getItem('order')); //Implatation de prénom et de id de commande dans le html sur la page de confirmation\n\n    document.getElementById('lastName').innerHTML = order.contact.lastName;\n    document.getElementById('orderId').innerHTML = order.orderId; //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct\n\n    sessionStorage.removeItem('order');\n  } else {\n    //avertissement et redirection vers l'accueil\n    alert('Aucune commande passée, vous êtes arrivé ici par erreur');\n    window.open('./index.html');\n  }\n}; //Exports\n\n\n\n\n//# sourceURL=webpack:///./controllers/main.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/main.js */ \"./controllers/main.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\nvar idProduit = ''; // getProduits().then(function (response) {\n//   console.log(response[0]);\n// });\n\n/*Création du HTML après appel de l'API\r\n ****************************************************************************************************************************************************/\n//liste des produits en vente sur la page index\n\nfunction allProductsList() {\n  return _allProductsList.apply(this, arguments);\n}\n\nfunction _allProductsList() {\n  _allProductsList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var produits, listProduct, main;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Object(_controllers_main_js__WEBPACK_IMPORTED_MODULE_0__[\"getProduits\"])();\n\n          case 2:\n            produits = _context.sent;\n            //Création de la section liste des produits\n            listProduct = document.createElement('section');\n            listProduct.setAttribute('class', 'liste-produits'); //Ajout de la section dans le HTML\n\n            main = document.getElementById('main');\n            main.appendChild(listProduct); //Pour chaque produit  de l'API exécute une fonction donnée ( on créé l'encadré HTML du produit )\n\n            produits.forEach(function (produit) {\n              //création des élements de la structure de la liste des produits en vente\n              //Une div conteneur )\n              var produitBlock = document.createElement('div'); //2 div(block gauche  droit)/\n\n              var produitLeft = document.createElement('div');\n              var produitRight = document.createElement('div'); // une image/\n\n              var produitImage = document.createElement('img'); //\n\n              var produitNom = document.createElement('h2'); //\n\n              var produitPrix = document.createElement('p'); //\n\n              var produitLink = document.createElement('a'); //Ajout des attributs pour  css\n\n              produitBlock.setAttribute('class', 'liste-produits__block');\n              produitLeft.setAttribute('class', 'liste-produits__block--left');\n              produitRight.setAttribute('class', 'liste-produits__block--right');\n              produitImage.setAttribute('src', produit.imageUrl);\n              produitImage.setAttribute('alt', 'image du produit');\n              produitLink.setAttribute('href', 'produit.html?id=' + produit._id); //******************************************************************************************* */\n              //Block conteneur en flex\n              //Block gauche comprend l'image du produit\n              //Bloc droit comprend le nom/prix/le lien du produit\n\n              listProduct.appendChild(produitBlock);\n              produitBlock.appendChild(produitLeft);\n              produitLeft.appendChild(produitImage);\n              produitBlock.appendChild(produitRight);\n              produitRight.appendChild(produitNom);\n              produitRight.appendChild(produitPrix);\n              produitRight.appendChild(produitLink); //contenu des balises\n\n              produitNom.textContent = produit.name;\n              produitPrix.textContent = produit.price / 100 + ' euros';\n              produitLink.textContent = 'Voir le produit';\n            });\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _allProductsList.apply(this, arguments);\n}\n\nallProductsList();\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi ./index.js ./controllers/main.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.js */\"./index.js\");\nmodule.exports = __webpack_require__(/*! ./controllers/main.js */\"./controllers/main.js\");\n\n\n//# sourceURL=webpack:///multi_./index.js_./controllers/main.js?");

/***/ })

/******/ });