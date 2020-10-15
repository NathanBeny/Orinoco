import { checkInput } from '../controllers/main.js'

/*Envoi du formulaire
 **********************************************/
//L'user  panier
const produitSell = 'cameras' //Au choix entre : "cameras meubles pelluche"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/'
//id produit => choix des different produit
//Tableau et objet demandé par l'API pour la commande
let contact
let products = []
let userPanier = JSON.parse(localStorage.getItem('userPanier'))

//Fonction requet post de l'API
let envoiDonnees = (objetRequest) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans order-confirm.html
        sessionStorage.setItem('order', this.responseText)

        //Chargement de la page de confirmation
        document.forms['form-panier'].action = './order-confirm.html'
        document.forms['form-panier'].submit()

        resolve(JSON.parse(this.responseText))
      }
    }
    request.open('POST', APIURL + 'order')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(objetRequest)
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
//Au click sur le btn de validation du formulaire
let validForm = () => {
  //Ecoute de l'event click du formulaire
  let btnForm = document.getElementById('envoiPost')
  btnForm.addEventListener('click', function () {
    //Lancement des verifications du panier et du form => si Ok envoi
    if (checkPanier() == true && checkInput() != null) {
      console.log("Administration : L'envoi peut etre fait")
      //Création de l'objet à envoyer
      let objet = {
        contact,
        products,
      }
      console.log('Administration : ' + objet)
      //Conversion en JSON
      let objetRequest = JSON.stringify(objet)
      console.log('Administration : ' + objetRequest)
      //Envoi de l'objet via la function
      envoiDonnees(objetRequest)

      //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
      contact = {}
      products = []
      localStorage.clear()
    } else {
      console.log('Administration : ERROR')
    }
  })
}
/*Affichage des informations sur la page de confirmation
 **********************************************/

let resultOrder = function () {
  if (sessionStorage.getItem('order') != null) {
    //Parse du session storage
    let order = JSON.parse(sessionStorage.getItem('order'))
    //Implatation de prénom et de id de commande dans le html sur la page de confirmation
    document.getElementById('lastName').innerHTML = order.contact.lastName
    document.getElementById('orderId').innerHTML = order.orderId

    //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem('order')
  } else {
    //avertissement et redirection vers l'accueil
    alert('Aucune commande passée, vous êtes arrivé ici par erreur')
    window.open('./index.html')
  }
}
envoiDonnees()
validForm()

//Exports
export { envoiDonnees, validForm, resultOrder }
