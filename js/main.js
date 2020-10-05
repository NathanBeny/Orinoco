/* API appel
 ******************************************************************************************************************************************************/

const produitSell = 'cameras' //Au choix entre : "cameras meubles pelluche"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/'
//id produit => choix des different produit
let error = ''
let idProduit = ''
let demo = document.getElementById('dodo')
let getProduits = () => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText))
        console.log('Administration : connection ok')

        //L'appel est réussi => suppression des message d'erreur
        error = document.getElementById('error')
        //On supprime le message d'erreur s'il existe
        if (error) {
          error.remove()
        }
      } else {
        console.log('Administration : ERROR connection API')
      }
    }
    request.open('GET', APIURL + idProduit)
    request.send()
  })
}

/*L'utilisateur à besoin d'un panier dans localStorage
Si le panier existe dans le localStorage ok, else créer et l'envoyer dans le localStorage **************************************************/

if (localStorage.getItem('userPanier')) {
  // console.log(localStorage);
  console.log(
    "Administration : le panier de l'utilisateur existe dans le localStorage"
  )
} else {
  console.log(
    "Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage"
  )
  //Le panier est un tableau de produits
  let panierInit = []
  localStorage.setItem('userPanier', JSON.stringify(panierInit))
}

//Tableau et objet demandé par l'API pour la commande
let contact
let products = []

//L'user a maintenant un panier
let userPanier = JSON.parse(localStorage.getItem('userPanier'))
/*Fonction ajouter le produit au panier de l'utilisateur
 *********************************************************************************************************************************************/
let addPanier = () => {
  //Au clic de l'user pour mettre le produit dans le panier
  let inputBuy = document.getElementById('ajouterProduitPanier')
  inputBuy.addEventListener('click', async function () {
    const produits = await getProduits()
    //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
    userPanier.push(produits)
    localStorage.setItem('userPanier', JSON.stringify(userPanier))
    console.log('Administration : le produit a été ajouté au panier')
    alert('Vous avez ajouté ce produit dans votre panier')
  })
}

//Exports
export { getProduits, addPanier }
