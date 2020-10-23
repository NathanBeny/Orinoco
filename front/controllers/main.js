const produitSell = 'cameras' //Au choix entre : "cameras meubles pelluche"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/'
//id produit => choix des different produit
let error = ''
let idProduit = ''
let demo = document.getElementById('dodo')

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

/* API appel
 ******************************************************************************************************************************************************/

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
//Supprimer un produit du panier
let annulerProduit = (i) => {
  console.log("Administration : Enlever le produit à l'index " + i)
  //recupérer le array
  userPanier.splice(i, 1)
  console.log('Administration : ' + userPanier)
  //vide le localstorage
  localStorage.clear()
  console.log('Administration : localStorage vidé')
  // mettre à jour le localStorage avec le nouveau panier
  localStorage.setItem('userPanier', JSON.stringify(userPanier))
  console.log('Administration : localStorage mis à jour')
  //relancer la création de l'addition
  window.location.reload()
}

let addition = () => {
  //Vérifie si un prduit est dans le panier
  if (JSON.parse(localStorage.getItem('userPanier')).length > 0) {
    //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
    document.getElementById('panierVide').remove()

    //Création de la structure principale du tableau
    let facture = document.createElement('table')
    let ligneTableau = document.createElement('tr')
    let colonneNom = document.createElement('th')
    let prixUnitaire = document.createElement('th')
    let colonneRemove = document.createElement('th')
    let ligneTotal = document.createElement('tr')
    let colonneRefTotal = document.createElement('th')
    let prixPay = document.createElement('td')

    //Placement de la structure dans la page et du contenu des entetes
    let factureSection = document.getElementById('panier-resume')
    factureSection.appendChild(facture)
    facture.appendChild(ligneTableau)
    ligneTableau.appendChild(colonneNom)
    colonneNom.textContent = 'Nom du produit'
    ligneTableau.appendChild(prixUnitaire)
    prixUnitaire.textContent = 'Prix du produit'

    //Pour chaque produit du panier, on créé une ligne avec le nom, le prix

    //Init de l'incrémentation de l'id des lignes pour chaque produit
    let i = 0

    JSON.parse(localStorage.getItem('userPanier')).forEach((produit) => {
      //Création de la ligne
      let ligneProduit = document.createElement('tr')
      let nomProduit = document.createElement('td')
      let prixUnitProduit = document.createElement('td')
      let removeProduit = document.createElement('i')

      //Attribution des class pour le css
      ligneProduit.setAttribute('id', 'produit' + i)
      removeProduit.setAttribute('id', 'remove' + i)
      removeProduit.setAttribute('class', 'fas fa-trash-alt annulerProduit')
      //Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit
      //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
      //annulerProduit L233
      removeProduit.addEventListener('click', annulerProduit.bind(i))
      i++

      //Insertion dans le HTML
      facture.appendChild(ligneProduit)
      ligneProduit.appendChild(nomProduit)
      ligneProduit.appendChild(prixUnitProduit)
      ligneProduit.appendChild(removeProduit)

      //Contenu des lignes
      nomProduit.innerHTML = produit.name
      prixUnitProduit.textContent = produit.price / 100 + ' €'
    })

    //Dernière ligne du tableau : Total
    facture.appendChild(ligneTotal)
    ligneTotal.appendChild(colonneRefTotal)
    colonneRefTotal.textContent = 'Total à payer'
    ligneTotal.appendChild(prixPay)
    prixPay.setAttribute('id', 'sommeTotal')

    //Calcule de l'addition total
    let totalPaye = 0
    JSON.parse(localStorage.getItem('userPanier')).forEach((produit) => {
      totalPaye += produit.price / 100
    })

    //Affichage du prix total à payer dans l'addition
    console.log('Administration : ' + totalPaye)
    document.getElementById('sommeTotal').textContent = totalPaye + ' €'
  }
}
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

/*Affichage des informations sur la page de confirmation
 **********************************************/
let resultOrder = () => {
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

//Exports
export { getProduits, annulerProduit, addition, checkInput, resultOrder }
