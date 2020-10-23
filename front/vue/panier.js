import { addition, annulerProduit, checkInput } from '../controllers/main.js'
import { envoiDonnees, validForm } from '../models/essais.js'

/*Création du HTML après appel de l'API
 **********************************************/

//L'user  panier
let userPanier = JSON.parse(localStorage.getItem('userPanier'))
/*recup Userpanier de l'utilisateur
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
//Vérification du panier
let checkPanier = () => {
  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem('userPanier'))
  //Si le panier est vide ou null (suppression localStorage par)=>alerte
  if (etatPanier == null) {
    //Si l'utilisateur à supprimer son localStorage etatPanier sur la page basket.html et qu'il continue le process de commande
    alert(
      'Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger'
    )
    return false
  } else if (etatPanier.length < 1 || etatPanier == null) {
    console.log(
      'Administration: ERROR =>le localStorage ne contient pas de panier'
    )
    alert('Votre panier est vide')
    return false
  } else {
    console.log("Administration : Le panier n'est pas vide")
    //Si le panier n'est pas vide on rempli le products envoyé à l'API
    JSON.parse(localStorage.getItem('userPanier')).forEach((produit) => {
      products.push(produit._id)
    })
    console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
    return true
  }
}

console.log(userPanier)

addition()
addPanier()
annulerProduit()
checkInput()
checkPanier()
envoiDonnees()
validForm()
