import { resultOrder } from '../controllers/main.js'

/*Génération de l'URL de l'API selon le choix de produit à vendre
 **********************************************/

const produitSell = 'cameras' //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/'
let error = ''
//id du produit pour permettre un tri dans l'API

let idProduit = ''

/*Appel de l'API
 **********************************************/

//Fonction requet post de l'API
let envoiDonnees = (objetRequest) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans order-confirm.html
        sessionStorage.setItem('order', this.responseText)

        //Chargement de la page de confirmation
        document.forms['form-panier'].action = '../order-confirm.html'
        document.forms['form-panier'].submit()

        resolve(JSON.parse(this.responseText))
      }
    }
    request.open('POST', APIURL + 'order')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(objetRequest)
  })
}

/*Création du HTML après appel de l'API
 **********************************************/

/*Build de la page du produit sélectionné
 **********************************************/

async function detailProduit() {
  //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
  idProduit = location.search.substring(4)

  const produitSelected = await getProduits()
  console.log(
    'Administration : Vous regardez la page du produit id_' +
      produitSelected._id
  )

  //Faire apparaitre la fiche produit initialement en display none
  let section = document.getElementById('section')
  section.style.display = 'block'

  //Remplissage de la fiche produit
  document
    .getElementById('imgProduct')
    .setAttribute('src', produitSelected.imageUrl)
  document.getElementById('nameProduct').innerHTML = produitSelected.name
  document.getElementById('descriptionProduct').innerHTML =
    produitSelected.description
  document.getElementById('priceProduct').innerHTML =
    produitSelected.price / 100 + ' euros'

  //Selon le type de produit (ligne 3) création des options
  switch (produitSell) {
    case 'cameras':
      produitSelected.lenses.forEach((produit) => {
        let optionProduit = document.createElement('option')
        document
          .getElementById('optionSelect')
          .appendChild(optionProduit).innerHTML = produit
      })
      break
    case 'furniture':
      produitSelected.varnish.forEach((produit) => {
        let optionProduit = document.createElement('option')
        document
          .getElementById('optionSelect')
          .appendChild(optionProduit).innerHTML = produit
      })
      break
    case 'teddies':
      produitSelected.colors.forEach((produit) => {
        let optionProduit = document.createElement('option')
        document
          .getElementById('optionSelect')
          .appendChild(optionProduit).innerHTML = produit
      })
      break
    default:
      console.log(
        'Administration : Veuillez bien renseigner la variable produitSell ligne 2 du fichier script.js'
      )
  }
}

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
detailProduit()
addPanier()
envoiDonnees()
resultOrder()

console.log(userPanier)
