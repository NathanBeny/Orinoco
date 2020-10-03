/* API appel
 ******************************************************************************************************************************************************/
const produitSell = 'cameras'; //Au choix entre : "cameras meubles pelluche"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/';
//id produit => choix des different produit

let idProduit = '';
function getProduits(url) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
        console.log('Administration : connection ok');

        //L'appel est réussi => suppression des message d'erreur
        error = document.getElementById('error');
        //On supprime le message d'erreur s'il existe
        if (error) {
          error.remove();
        }
      } else {
        console.log('Administration : ERROR connection API');
      }
    };
    request.open('GET', APIURL + idProduit);
    request.send();
  });
}

//Exports
export { getProduits };
