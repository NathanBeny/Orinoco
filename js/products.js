// choix de la caméras

const produitSell = 'cameras'; //Au choix entre : "cameras meubles pelluche"
const APIURL = 'http://localhost:3000/api/' + produitSell + '/';
//id produit => choix des different produit

let idProduit = '';
/* API appel
 ******************************************************************************************************************************************************/

let demo = document.getElementById('dodo');

getProduits = () => {
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
};

// getProduits().then(function (response) {
//   console.log(response[0]);
// });

/*Création du HTML après appel de l'API
 ****************************************************************************************************************************************************/

//liste des produits en vente sur la page index
async function allProductsList() {
  const produits = await getProduits();

  //Création de la section liste des produits
  let listProduct = document.createElement('section');
  listProduct.setAttribute('class', 'liste-produits');
  //Ajout de la section dans le HTML
  let main = document.getElementById('main');
  main.appendChild(listProduct);

  //Pour chaque produit  de l'API exécute une fonction donnée ( on créé l'encadré HTML du produit )
  produits.forEach((produit) => {
    //création des élements de la structure de la liste des produits en vente
    //Une div conteneur )
    let produitBlock = document.createElement('div');
    //2 div(block gauche  droit)/
    let produitLeft = document.createElement('div');
    let produitRight = document.createElement('div');
    // une image/
    let produitImage = document.createElement('img');
    //
    let produitNom = document.createElement('h2');
    //
    let produitPrix = document.createElement('p');
    //
    let produitLink = document.createElement('a');

    //Ajout des attributs pour  css
    produitBlock.setAttribute('class', 'liste-produits__block');
    produitLeft.setAttribute('class', 'liste-produits__block--left');
    produitRight.setAttribute('class', 'liste-produits__block--right');
    produitImage.setAttribute('src', produit.imageUrl);
    produitImage.setAttribute('alt', 'image du produit');
    produitLink.setAttribute('href', 'produit.html?id=' + produit._id);
    //******************************************************************************************* */
    //Block conteneur en flex
    //Block gauche comprend l'image du produit
    //Bloc droit comprend le nom/prix/le lien du produit
    listProduct.appendChild(produitBlock);
    produitBlock.appendChild(produitLeft);
    produitLeft.appendChild(produitImage);
    produitBlock.appendChild(produitRight);
    produitRight.appendChild(produitNom);
    produitRight.appendChild(produitPrix);
    produitRight.appendChild(produitLink);

    //contenu des balises
    produitNom.textContent = produit.name;
    produitPrix.textContent = produit.price / 100 + ' euros';
    produitLink.textContent = 'Voir le produit';
  });
}

/*Build de la page du produit sélectionné
 *****************************************************************************************************************************************************/
//************************ */

async function detailProduit() {
  //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
  idProduit = location.search.substring(4);
  const produitSelected = await getProduits();
  console.log(
    'Administration : Vous regardez la page du produit id_' +
      produitSelected._id
  );

  //Faire apparaitre  produit originalement display none

  let section = document.getElementById('section');
  // console.log(section);
  section.style.display = 'block';

  //Remplissage de la fiche produit
  document
    .getElementById('imgProduct')
    .setAttribute('src', produitSelected.imageUrl);
  document.getElementById('nameProduct').innerHTML = produitSelected.name;
  document.getElementById('descriptionProduct').innerHTML =
    produitSelected.description;
  document.getElementById('priceProduct').innerHTML =
    produitSelected.price / 100 + ' euros';

  //Selon le type de produit (ligne 3) création des options
  switch (produitSell) {
    case 'cameras':
      produitSelected.lenses.forEach((produit) => {
        let optionProduit = document.createElement('option');
        // console.log(optionProduit);
        document
          .getElementById('optionSelect')
          .appendChild(optionProduit).innerHTML = produit;
      });
      break;
    // case 'furniture':
    //   produitSelected.varnish.forEach((produit) => {
    //     let optionProduit = document.createElement('option');
    //     document
    //       .getElementById('optionSelect')
    //       .appendChild(optionProduit).innerHTML = produit;
    //   });
    //   break;
    // case 'teddies':
    //   produitSelected.colors.forEach((produit) => {
    //     let optionProduit = document.createElement('option');
    //     document
    //       .getElementById('optionSelect')
    //       .appendChild(optionProduit).innerHTML = produit;
    //   });
    //   break;
    default:
  }
}

/*L'utilisateur à besoin d'un panier dans localStorage 
Si le panier existe dans le localStorage ok, else créer et l'envoyer dans le localStorage **************************************************/

if (localStorage.getItem('userPanier')) {
  // console.log(localStorage);
  console.log(
    "Administration : le panier de l'utilisateur existe dans le localStorage"
  );
} else {
  console.log(
    "Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage"
  );
  //Le panier est un tableau de produits
  let panierInit = [];
  localStorage.setItem('userPanier', JSON.stringify(panierInit));
}

//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];

//L'user a maintenant un panier
let userPanier = JSON.parse(localStorage.getItem('userPanier'));
/*Fonction ajouter le produit au panier de l'utilisateur
 *********************************************************************************************************************************************/
addPanier = () => {
  //Au clic de l'user pour mettre le produit dans le panier
  let inputBuy = document.getElementById('ajouterProduitPanier');
  inputBuy.addEventListener('click', async function () {
    const produits = await getProduits();
    //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
    userPanier.push(produits);
    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log('Administration : le produit a été ajouté au panier');
    alert('Vous avez ajouté ce produit dans votre panier');
  });
};

/*Page panier
 ***********************************************************************************************************************************************/

addition = () => {
  //Vérifie si un prduit est dans le panier
  if (JSON.parse(localStorage.getItem('userPanier')).length > 0) {
    //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
    document.getElementById('panierVide').remove();

    //Création de la structure principale du tableau
    let facture = document.createElement('table');
    let ligneTableau = document.createElement('tr');
    let colonneNom = document.createElement('th');
    let prixUnitaire = document.createElement('th');
    let colonneRemove = document.createElement('th');
    let ligneTotal = document.createElement('tr');
    let colonneRefTotal = document.createElement('th');
    let prixPay = document.createElement('td');

    //Placement de la structure dans la page et du contenu des entetes
    let factureSection = document.getElementById('panier-resume');
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneNom);
    colonneNom.textContent = 'Nom du produit';
    ligneTableau.appendChild(prixUnitaire);
    prixUnitaire.textContent = 'Prix du produit';

    //Pour chaque produit du panier, on créé une ligne avec le nom, le prix

    //Init de l'incrémentation de l'id des lignes pour chaque produit
    let i = 0;

    JSON.parse(localStorage.getItem('userPanier')).forEach((produit) => {
      //Création de la ligne
      let ligneProduit = document.createElement('tr');
      let nomProduit = document.createElement('td');
      let prixUnitProduit = document.createElement('td');
      let removeProduit = document.createElement('i');

      //Attribution des class pour le css
      ligneProduit.setAttribute('id', 'produit' + i);
      removeProduit.setAttribute('id', 'remove' + i);
      removeProduit.setAttribute('class', 'fas fa-trash-alt annulerProduit');
      //Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit
      //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
      //annulerProduit L233
      removeProduit.addEventListener('click', annulerProduit.bind(i));
      i++;

      //Insertion dans le HTML
      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);

      //Contenu des lignes
      nomProduit.innerHTML = produit.name;
      prixUnitProduit.textContent = produit.price / 100 + ' €';
    });

    //Dernière ligne du tableau : Total
    facture.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneRefTotal);
    colonneRefTotal.textContent = 'Total à payer';
    ligneTotal.appendChild(prixPay);
    prixPay.setAttribute('id', 'sommeTotal');

    //Calcule de l'addition total
    let totalPaye = 0;
    JSON.parse(localStorage.getItem('userPanier')).forEach((produit) => {
      totalPaye += produit.price / 100;
    });

    //Affichage du prix total à payer dans l'addition
    console.log('Administration : ' + totalPaye);
    document.getElementById('sommeTotal').textContent = totalPaye + ' €';
  }
};
