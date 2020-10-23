/*Génération de l'URL de l'API selon le choix de produit à vendre
 **********************************************/

const produitSell = 'cameras' //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/'

//id du produit pour permettre un tri dans l'API

let idProduit = ''

/*Préparation des requis pour le script
 **********************************************/

/*L'utilisateur à besoin d'un panier dans le localStorage de son navigateur
Vérifier si le panier existe dans le localStorage, sinon le créer et l'envoyer dans le localStorage au premier chargement du site quelque soit la page*/

if (localStorage.getItem('userPanier')) {
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

/*Formulaire et vérif etat panier
 **********************************************/

//vérifie les inputs du formulaire
let checkInput = () => {
  //Controle Regex
  let checkString = /[a-zA-Z]/
  let checkNumber = /[0-9]/
  //Source pour vérification email => emailregex.com
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y
  let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/

  //message fin de controle
  let checkMessage = ''

  //Récupération des inputs
  let formNom = document.getElementById('formNom').value
  let formPrenom = document.getElementById('formPrenom').value
  let formMail = document.getElementById('formMail').value
  let formAdresse = document.getElementById('formAdresse').value
  let formVille = document.getElementById('formVille').value

  //tests des différents input du formulaire
  //Test du nom => aucun chiffre ou charactère spécial permis
  if (
    checkNumber.test(formNom) == true ||
    checkSpecialCharacter.test(formNom) == true ||
    formNom == ''
  ) {
    checkMessage = 'Vérifier/renseigner votre nom'
  } else {
    console.log('Administration : Nom ok')
  }
  //Test du nom => aucun chiffre ou charactère spécial permis
  if (
    checkNumber.test(formPrenom) == true ||
    checkSpecialCharacter.test(formPrenom) == true ||
    formPrenom == ''
  ) {
    checkMessage = checkMessage + '\n' + 'Vérifier/renseigner votre prénom'
  } else {
    console.log('Administration : Prénom ok')
  }
  //Test du mail selon le regex de la source L256
  if (checkMail.test(formMail) == false) {
    checkMessage = checkMessage + '\n' + 'Vérifier/renseigner votre email'
  } else {
    console.log('Administration : Adresse mail ok')
  }
  //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
  if (checkSpecialCharacter.test(formAdresse) == true || formAdresse == '') {
    checkMessage = checkMessage + '\n' + 'Vérifier/renseigner votre adresse'
  } else {
    console.log('Administration : Adresse ok')
  }
  //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
  if (
    (checkSpecialCharacter.test(formVille) == true &&
      checkNumber.test(formVille) == true) ||
    formVille == ''
  ) {
    checkMessage = checkMessage + '\n' + 'Vérifier/renseigner votre ville'
  } else {
    console.log('Administration : Ville ok')
  }
  //Si un des champs n'est pas bon => message d'alert avec la raison
  if (checkMessage != '') {
    alert('Il est nécessaire de :' + '\n' + checkMessage)
  }
  //Si tout est ok construction de l'objet contact => a revoir
  else {
    contact = {
      firstName: formNom,
      lastName: formPrenom,
      address: formAdresse,
      city: formVille,
      email: formMail,
    }
    return contact
  }
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

/*Envoi du formulaire
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
        document.forms['form-panier'].action = '../front/order-confirm.html'
        document.forms['form-panier'].submit()

        resolve(JSON.parse(this.responseText))
      }
    }
    request.open('POST', APIURL + 'order')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(objetRequest)
  })
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

envoiDonnees()
validForm()

//Exports
export { envoiDonnees, validForm }
