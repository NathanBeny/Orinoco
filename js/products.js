import { addPanier } from './main.js'

/*Génération de l'URL de l'API selon le choix de produit à vendre
 **********************************************/

const produitSell = 'cameras' //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/'
let error = ''
//id du produit pour permettre un tri dans l'API

let idProduit = ''

/*Appel de l'API
 **********************************************/

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

detailProduit()
addPanier()
