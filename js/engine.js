/* Cela stocke les éléments du DOM */
const tagsList = document.querySelector('#tags');
const searchBar = document.querySelector('#searchbar');
const recipesList = document.querySelector('#recipes');

/* Cela rend les dropdowns du DOM dynamiques grâce à la classe Dropdown */
const ingredientsDropdown = new Dropdown(".dropdown[data-type='ingredient']");
const devicesDropdown = new Dropdown(".dropdown[data-type='device']");
const ustensilsDropdown = new Dropdown(".dropdown[data-type='ustensil']");

/* Cela stocke les variables relatives à la recherche en cours */
let usedTags = [];
let mainquery = '';

/*
-- Fonctions de Template
 */

/**
 * Cette fonction permet d'obtenir le HTML d'une recette
 * @param recipe {Object} Objet de la recette
 * @return {String} Retourne le code HTML de la recette précisée
 */
function recipeTemplate(recipe) {
  /* Cela extrait les données de la recette et parse la description */
  const {
    name, time, description, ingredients,
  } = recipe;
  const parsedDescription = description.substring(0, 160);

  /* Cela génère le HTML des ingrédients de la recette */
  const ingredientsHTML = ingredients.map((item) => {
    const { ingredient, unit, quantity } = item;
    return `<li><strong>${ingredient}:</strong> ${
      unit ? `${quantity} ${unit}` : quantity
    }</li>`;
  }).join('');

  /* Cela renvoie le HTML de la recette */
  return `<section class="recipes-item">
    <img src="assets/recipes/_empty.png" alt="${name}" class="recipes-item-banner">
    <div class="recipes-item-top">
        <p class="recipes-item-title">${name}</p>
        <p class="recipes-item-time">
            <span>
                <i class="far fa-clock"></i>
            </span>
            ${time} min
        </p>
    </div>
    <div class="recipes-item-bottom">
        <ul class="recipes-item-ingredients">
            ${ingredientsHTML}
        </ul>
        <p class="recipes-item-explanation">
            ${parsedDescription}
        </p>
    </div>
</section>`;
}

/**
 * Cette fonction permet d'obtenir le HTML d'un tag
 * @param tag {Object} Objet du tag
 * @return {String} Retourne le code HTML du tag précisé
 */
function tagTemplate(tag) {
  /* Cela extrait les données du tag */
  const { type, name } = tag;

  /* Cela retourne le HTML du tag */
  return `<li class="search-tags-item" data-type="${type}" data-name="${name}">
    <span class="tag tag-${type}">
        ${name}
        <button class="tag-delete">
            <i class="far fa-times-circle"></i>
        </button>
    </span>
</li>`;
}

/*
-- Fonctions de Rendu
 */

/**
 * Cette fonction permet de mettre à jour visuelement les recettes dans le DOM
 * @param recipes {Array<Object>} La liste des recettes
 */
function renderRecipes(recipes) {
  /* On redéfini le HTML des recettes en fonction de l'argument recipes */
  const html = recipes.map((recipe) => recipeTemplate(recipe)).join('');
  recipesList.innerHTML = html;
}

/**
 * Cette fonction permet de mettre à jour visuelement les tags dans le DOM
 * @param tags {Array<Object>} La liste des tags
 */
function renderTags(tags) {
  /* On redéfini le HTML des tags en fonction de l'argument tags */
  const html = tags.map((tag) => tagTemplate(tag)).join('');
  tagsList.innerHTML = html;

  /* Ajout des listeners pour permettre de retirer les tags */
  tags.forEach((tag) => {
    const tagRemover = document.querySelector(`.search-tags-item[data-name='${tag.name}'] button`);
    tagRemover.addEventListener('click', () => removeTag(tag));
  })
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
  // eslint-disable-next-line no-undef
  let recipes = getRecipes();
  let availableTags = [];

  /* Retirer les recettes en fonction des tags sélectionnés */
  recipes = recipes.filter((recipe) => {
    return tags.every(tag => recipe.getTags().some((recipeTag) => recipeTag.equals(tag)))
  })

  /* Effectuer la recherche via la query */
  if (query.length >= 3) {
    /* On parse la query */
    const parsedQuery = mainquery.toLocaleLowerCase();

    /* On tri les recettes en fonction de la query */
    recipes = recipes.filter(function (recipe) {
      /* On parse les différents paramètres de la recettes */
      const parsedRecipeName = recipe.name.toLowerCase();
      const parsedRecipeDescription = recipe.description.toLowerCase();
      const parsedRecipeIngredients = recipe.ingredients
        .map(function (ingredient) {
          return ingredient.ingredient.toLowerCase();
        })
        .join(" ");

      /* On vérifie que le nom contiens la query */
      const nameCondition = parsedRecipeName.includes(parsedQuery);

      /* On vérifie que la description contiens la query */
      const descriptionCondition =
        parsedRecipeDescription.includes(parsedQuery);

      /* On vérifie que les ingrédients contienent la query */
      const ingredientsCondition =
        parsedRecipeIngredients.includes(parsedQuery);

      /* On retourne true sur une des conditions est respectée */
      return nameCondition || descriptionCondition || ingredientsCondition;
    });
  }

  /* Ajouter les tags disponibles en fonction des recettes disponibles après la recherche */
  recipes.forEach((recipe) => {
    availableTags = availableTags.concat(recipe.getTags())
  })

  /* Retirer les tags sélectionnés */
  availableTags = availableTags.filter((availableTag) => {
    return !usedTags.some((usedTag) => usedTag.equals(availableTag))
  })

  /* Supprimer les tags dupliqués */
  const cleanTags = []
  availableTags.forEach((tag) => {
    if (cleanTags.some((cleanTag) => cleanTag.equals(tag))) return;
    cleanTags.push(tag)
  })

  /* Vider les dropdowns */
  ingredientsDropdown.clearItems();
  devicesDropdown.clearItems();
  ustensilsDropdown.clearItems();

  /* Redéfinir les Dropdowns */
  cleanTags.forEach((tag) => {
    switch (tag.type) {
      case 'ingredient':
        ingredientsDropdown.addItem(tag.name)
        break;
      case 'device':
        devicesDropdown.addItem(tag.name)
        break;
      case 'ustensil':
        ustensilsDropdown.addItem(tag.name)
        break;
      default:
        throw new Error("Unhandled tag type used!")
        break;
    }
  })

  renderRecipes(recipes);
  renderTags(usedTags);
}

/*
-- Gestion des tags
 */

/**
 * Cette fonction permet de retirer un tags aux paramètres de recherche
 * @param tag {Object} L'objet du tag
 */
function removeTag(tag) {
  /* Retirer le tag de la liste des tags de l'algo */
  usedTags = usedTags.filter((elem) => tag !== elem);

  /* Rajouter le tag dans son dropdown respectif */
  switch (tag.type) {
    case 'ingredient':
      ingredientsDropdown.addItem(tag.name);
      break;
    case 'device':
      devicesDropdown.addItem(tag.name);
      break;
    case 'ustensil':
      ustensilsDropdown.addItem(tag.name);
      break;
    default:
      break;
  }

  /* Mettre à jour le rendu des tags et recalculer les recettes */
  renderTags(usedTags);
  performAlgo(mainquery, usedTags);
}

/**
 * Cette fonction permet d'ajouter un tags aux paramètres de recherche
 * @param tag {Object} L'objet du tag
 */
function addTag(tag) {
  /* Cela vérifie que le tag n'est pas déjà sélectionné */
  if (usedTags.some((usedTag) => usedTag.equals(tag))) return;

  /* Ajout du tag dans la liste des tags de l'algo */
  usedTags.push(tag);

  /* Cela retire le tag du dropdown en question */
  switch (tag.type) {
    case 'ingredient':
      ingredientsDropdown.removeItem(tag.name);
      break;
    case 'device':
      devicesDropdown.removeItem(tag.name);
      break;
    case 'ustensil':
      ustensilsDropdown.removeItem(tag.name);
      break;
    default:
      break;
  }

  /* Mettre à jour le rendu des tags et recalculer les recettes */
  renderTags(usedTags);
  performAlgo(mainquery, usedTags);
}

/**
 * Cette fonction est appélée lorsqu'un facteur de recherche est modifié (barre de recherche, tags)
 * @param e {Event} Objet de l'événement
 */
function handleInputsChange(e) {
  const { name, value } = e.target;

  switch (name) {
    case 'searchbar':
      mainquery = value;
      break;
    case 'tag':
      addTag(value);
      break;
    default:
      throw new Error('Unhandled input change');
  }

  performAlgo(mainquery, usedTags);
}

/*
-- Ecoute des événements
 */

/* Evenement appelé lorsque le texte de la barre de recherche est modifié */
searchBar.addEventListener('keyup', handleInputsChange);

/* Evenement appelé lorsqu'un ingrédient est ajouté depuis un dropdown */
ingredientsDropdown.setCallback((name, type) => {
  // eslint-disable-next-line no-undef
  const tag = new Tag({
    name,
    type,
  });
  handleInputsChange({
    target: {
      name: 'tag',
      value: tag,
    },
  });
});

/* Evenement appelé lorsqu'un appareil est ajouté depuis un dropdown */
devicesDropdown.setCallback((name, type) => {
// eslint-disable-next-line no-undef
  const tag = new Tag({
    name,
    type,
  });
  handleInputsChange({
    target: {
      name: 'tag',
      value: tag,
    },
  });
});

/* Evenement appelé lorsqu'un ustensil est ajouté depuis un dropdown */
ustensilsDropdown.setCallback((name, type) => {
  // eslint-disable-next-line no-undef
  const tag = new Tag({
    name,
    type,
  });
  handleInputsChange({
    target: {
      name: 'tag',
      value: tag,
    },
  });
});

/*
-- Initialisation
 */
/* Cela appelle la fonction qui calcule les recettes à afficher pour les rendre au chargement  */
performAlgo(mainquery, usedTags);
