import { getProduits } from './main.js'

let idProduit = ''
let produitSell = ''

/*Page panier
 ***********************************************************************************************************************************************/

addition = () => {
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
addition()
