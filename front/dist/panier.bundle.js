!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=338)}({14:function(e,t,n){"use strict";n.r(t),n.d(t,"getProduits",(function(){return a})),n.d(t,"annulerProduit",(function(){return i})),n.d(t,"addition",(function(){return l})),n.d(t,"checkInput",(function(){return s}));var r="";document.getElementById("dodo");if(localStorage.getItem("userPanier"))console.log("Administration : le panier de l'utilisateur existe dans le localStorage");else{console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");localStorage.setItem("userPanier",JSON.stringify([]))}var o=JSON.parse(localStorage.getItem("userPanier")),a=function(){return new Promise((function(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){this.readyState==XMLHttpRequest.DONE&&200==this.status?(e(JSON.parse(this.responseText)),console.log("Administration : connection ok"),(r=document.getElementById("error"))&&r.remove()):console.log("Administration : ERROR connection API")},t.open("GET","http://localhost:3000/api/cameras/"),t.send()}))},i=function(e){console.log("Administration : Enlever le produit à l'index "+e),o.splice(e,1),console.log("Administration : "+o),localStorage.clear(),console.log("Administration : localStorage vidé"),localStorage.setItem("userPanier",JSON.stringify(o)),console.log("Administration : localStorage mis à jour"),window.location.reload()},l=function(){if(JSON.parse(localStorage.getItem("userPanier")).length>0){document.getElementById("panierVide").remove();var e=document.createElement("table"),t=document.createElement("tr"),n=document.createElement("th"),r=document.createElement("th"),o=(document.createElement("th"),document.createElement("tr")),a=document.createElement("th"),l=document.createElement("td");document.getElementById("panier-resume").appendChild(e),e.appendChild(t),t.appendChild(n),n.textContent="Nom du produit",t.appendChild(r),r.textContent="Prix du produit";var s=0;JSON.parse(localStorage.getItem("userPanier")).forEach((function(t){var n=document.createElement("tr"),r=document.createElement("td"),o=document.createElement("td"),a=document.createElement("i");n.setAttribute("id","produit"+s),a.setAttribute("id","remove"+s),a.setAttribute("class","fas fa-trash-alt annulerProduit"),a.addEventListener("click",i.bind(s)),s++,e.appendChild(n),n.appendChild(r),n.appendChild(o),n.appendChild(a),r.innerHTML=t.name,o.textContent=t.price/100+" €"})),e.appendChild(o),o.appendChild(a),a.textContent="Total à payer",o.appendChild(l),l.setAttribute("id","sommeTotal");var c=0;JSON.parse(localStorage.getItem("userPanier")).forEach((function(e){c+=e.price/100})),console.log("Administration : "+c),document.getElementById("sommeTotal").textContent=c+" €"}},s=function(){var e=/[0-9]/,t=new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])","y"),n=/[§!@#$%^&*(),.?":{}|<>]/,r="",o=document.getElementById("formNom").value,a=document.getElementById("formPrenom").value,i=document.getElementById("formMail").value,l=document.getElementById("formAdresse").value,s=document.getElementById("formVille").value;if(1==e.test(o)||1==n.test(o)||""==o?r="Vérifier/renseigner votre nom":console.log("Administration : Nom ok"),1==e.test(a)||1==n.test(a)||""==a?r+="\nVérifier/renseigner votre prénom":console.log("Administration : Prénom ok"),0==t.test(i)?r+="\nVérifier/renseigner votre email":console.log("Administration : Adresse mail ok"),1==n.test(l)||""==l?r+="\nVérifier/renseigner votre adresse":console.log("Administration : Adresse ok"),1==n.test(s)&&1==e.test(s)||""==s?r+="\nVérifier/renseigner votre ville":console.log("Administration : Ville ok"),""==r)return{firstName:o,lastName:a,address:l,city:s,email:i};alert("Il est nécessaire de :\n"+r)}},338:function(e,t,n){n(14),n(339),e.exports=n(53)},339:function(e,t,n){"use strict";n.r(t);var r=n(14),o=n(53);function a(e,t,n,r,o,a,i){try{var l=e[a](i),s=l.value}catch(e){return void n(e)}l.done?t(s):Promise.resolve(s).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function l(e){a(i,r,o,l,s,"next",e)}function s(e){a(i,r,o,l,s,"throw",e)}l(void 0)}))}}var l,s=JSON.parse(localStorage.getItem("userPanier"));console.log(s),Object(r.addition)(),document.getElementById("ajouterProduitPanier").addEventListener("click",i(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,getProduits();case 2:t=e.sent,s.push(t),localStorage.setItem("userPanier",JSON.stringify(s)),console.log("Administration : le produit a été ajouté au panier"),alert("Vous avez ajouté ce produit dans votre panier");case 7:case"end":return e.stop()}}),e)})))),Object(r.annulerProduit)(),Object(r.checkInput)(),null==(l=JSON.parse(localStorage.getItem("userPanier")))?alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger"):l.length<1||null==l?(console.log("Administration: ERROR =>le localStorage ne contient pas de panier"),alert("Votre panier est vide")):(console.log("Administration : Le panier n'est pas vide"),JSON.parse(localStorage.getItem("userPanier")).forEach((function(e){products.push(e._id)})),console.log("Administration : Ce tableau sera envoyé à l'API : "+products)),Object(o.envoiDonnees)(),Object(o.validForm)(),Object(o.resultOrder)()},53:function(e,t,n){"use strict";n.r(t),n.d(t,"envoiDonnees",(function(){return i})),n.d(t,"validForm",(function(){return l})),n.d(t,"resultOrder",(function(){return s}));var r,o=n(14),a=[],i=(JSON.parse(localStorage.getItem("userPanier")),function(e){return new Promise((function(t){var n=new XMLHttpRequest;n.onreadystatechange=function(){this.readyState==XMLHttpRequest.DONE&&201==this.status&&(sessionStorage.setItem("order",this.responseText),document.forms["form-panier"].action="./order-confirm.html",document.forms["form-panier"].submit(),t(JSON.parse(this.responseText)))},n.open("POST","http://localhost:3000/api/cameras/order"),n.setRequestHeader("Content-Type","application/json"),n.send(e)}))}),l=function(){document.getElementById("envoiPost").addEventListener("click",(function(){if(1==(null==(n=JSON.parse(localStorage.getItem("userPanier")))?(alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger"),!1):n.length<1||null==n?(console.log("Administration: ERROR =>le localStorage ne contient pas de panier"),alert("Votre panier est vide"),!1):(console.log("Administration : Le panier n'est pas vide"),JSON.parse(localStorage.getItem("userPanier")).forEach((function(e){a.push(e._id)})),console.log("Administration : Ce tableau sera envoyé à l'API : "+a),!0))&&null!=Object(o.checkInput)()){console.log("Administration : L'envoi peut etre fait");var e={contact:r,products:a};console.log("Administration : "+e);var t=JSON.stringify(e);console.log("Administration : "+t),i(t),r={},a=[],localStorage.clear()}else console.log("Administration : ERROR");var n}))},s=function(){if(null!=sessionStorage.getItem("order")){var e=JSON.parse(sessionStorage.getItem("order"));document.getElementById("lastName").innerHTML=e.contact.lastName,document.getElementById("orderId").innerHTML=e.orderId,sessionStorage.removeItem("order")}else alert("Aucune commande passée, vous êtes arrivé ici par erreur"),window.open("./index.html")};i(),l()}});