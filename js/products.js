// choix de produit à vendre

const produitSell = 'cameras'; //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/';

/*Appel de l'API
 **********************************************/

let demo = document.getElementById('dodo');
let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  console.log(this);
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    // JSON.parse permet interargir avec donnes

    demo.innerHTML = this.response;
    console.log(JSON.parse(this.responseText));
    console.log('Administration : connection ok');

    //L'appel est réussi => suppression des message d'erreur
    error = document.getElementById('error');
    //On supprime le message d'erreur s'il existe
  }
};
request.open('GET', APIURL);
request.send();
