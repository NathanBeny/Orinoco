import { getProduits } from './controllers/main.js'

let idProduit = ''

// getProduits().then(function (response) {
//   console.log(response[0]);
// });

/*Création du HTML après appel de l'API
 ****************************************************************************************************************************************************/

//liste des produits en vente sur la page index
async function allProductsList() {
  const produits = await getProduits()

  //Création de la section liste des produits
  let listProduct = document.createElement('section')
  listProduct.setAttribute('class', 'liste-produits')
  //Ajout de la section dans le HTML
  let main = document.getElementById('main')
  main.appendChild(listProduct)

  //Pour chaque produit  de l'API exécute une fonction donnée ( on créé l'encadré HTML du produit )
  produits.forEach((produit) => {
    //création des élements de la structure de la liste des produits en vente
    //Une div conteneur )
    let produitBlock = document.createElement('div')
    //2 div(block gauche  droit)/
    let produitLeft = document.createElement('div')
    let produitRight = document.createElement('div')
    // une image/
    let produitImage = document.createElement('img')
    //
    let produitNom = document.createElement('h2')
    //
    let produitPrix = document.createElement('p')
    //
    let produitLink = document.createElement('a')

    //Ajout des attributs pour  css
    produitBlock.setAttribute('class', 'liste-produits__block')
    produitLeft.setAttribute('class', 'liste-produits__block--left')
    produitRight.setAttribute('class', 'liste-produits__block--right')
    produitImage.setAttribute('src', produit.imageUrl)
    produitImage.setAttribute('alt', 'image du produit')
    produitLink.setAttribute('href', 'produit.html?id=' + produit._id)
    //******************************************************************************************* */
    //Block conteneur en flex
    //Block gauche comprend l'image du produit
    //Bloc droit comprend le nom/prix/le lien du produit
    listProduct.appendChild(produitBlock)
    produitBlock.appendChild(produitLeft)
    produitLeft.appendChild(produitImage)
    produitBlock.appendChild(produitRight)
    produitRight.appendChild(produitNom)
    produitRight.appendChild(produitPrix)
    produitRight.appendChild(produitLink)

    //contenu des balises
    produitNom.textContent = produit.name
    produitPrix.textContent = produit.price / 100 + ' euros'
    produitLink.textContent = 'Voir le produit'
  })
}

allProductsList()
