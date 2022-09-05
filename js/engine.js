/* Cela stocke les éléments du DOM */
const tagsList = document.querySelector('#tags');
const searchBar = document.querySelector('#searchbar');
const recipesList = document.querySelector('#recipes');

/* Cela rend les dropdowns du DOM dynamiques grâce à la classe Dropdown */
const ingredientsDropdown = new Dropdown(".dropdown[data-type='ingredient']");
const devicesDropdown = new Dropdown(".dropdown[data-type='device']");
const utensilsDropdown = new Dropdown(".dropdown[data-type='utensil']");

/* Cela stocke les variables relatives à la recherche en cours */
const tags = [];
const mainquery = '';
const availableRecipes = [];

/*
-- Fonctions de Template
 */

// todo : recipe template
/**
 * Cette fonction permet d'obtenir le HTML d'une recette
 * @param recipe {Object} Objet de la recette
 * @return {String} Retourne le code HTML de la recette précisée
 */
function recipeTemplate(recipe) {
  return ``;
}

// todo : tag template
/**
 * Cette fonction permet d'obtenir le HTML d'un tag
 * @param tag {Object} Objet du tag
 * @return {String} Retourne le code HTML du tag précisé
 */
function tagTemplate(tag) {
  return ``;
}

/*
-- Fonctions de Rendu
 */

// todo : render recipes
/**
 * Cette fonction permet de mettre à jour visuelement les recettes dans le DOM
 */
function renderRecipes() {

}

// todo : render tags
/**
 * Cette fonction permet de mettre à jour visuelement les tags dans le DOM
 */
function renderTags() {

}

/*
-- Algorythme
 */

// todo : base de l'algo avec les tags
/**
 * Cette fonction permet de calculer les recettes à afficher en fonction des paramètres donnés
 * @param query {String} Le texte saisi dans la barre de recherche
 * @param tags {Array<Object>} La liste des tags sélectionnés
 */
function performAlgo(query, tags) {

}

// todo : handle inputs
/**
 * Cette fonction est appélée lorsqu'un facteur de recherche est modifié (barre de recherche, tags)
 * @param e {Event} Objet de l'événement
 */
function handleInputsChange(e) {

}

/*
-- Gestion des tags
 */

// todo : add tag
/**
 * Cette fonction permet d'ajouter un tags aux paramètres de recherche
 * @param tag {Object} L'objet du tag
 */
function addTag(tag) {

}

// todo : remove tag
/**
 * Cette fonction permet de retirer un tags aux paramètres de recherche
 * @param tag {Object} L'objet du tag
 */
function removeTag(tag) {

}

/*
-- Ecoute des événements
 */

/* Evenement appelé lorsque le texte de la barre de recherche est modifié */
searchBar.addEventListener('keyup', handleInputsChange);

/* Evenement appelé lorsqu'un ingrédient est ajouté depuis un dropdown */
ingredientsDropdown.setCallback((name, type) => {

});

/* Evenement appelé lorsqu'un appareil est ajouté depuis un dropdown */
devicesDropdown.setCallback((name, type) => {

});

/* Evenement appelé lorsqu'un ustensil est ajouté depuis un dropdown */
utensilsDropdown.setCallback((name, type) => {

});

/*
-- Initialisation
 */
performAlgo(mainquery, tags);
