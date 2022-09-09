/**
 * La classe Recipe
 */
class Recipe {
  #name;

  #time;

  #description;

  #ingredients;

  #ustensils;

  #device;

  /**
   * Constructeur de la classe Recipe
   * @param data {Object} L'objet des données de la recette
   */
  constructor(data) {
    this.#name = data.name;
    this.#time = data.time;
    this.#description = data.description;
    this.#ingredients = data.ingredients;
    this.#ustensils = data.ustensils;
    this.#device = data.device;
  }

  /**
   * Obtenir le nom de la recette
   * @return {String} Retourne le nom de la recette
   */
  get name() {
    return this.#name;
  }

  /**
   * Obtenir la durée de la recette
   * @return {Number} Retourne la durée de la recette
   */
  get time() {
    return this.#time;
  }

  /**
   * Obtenir la description de la recette
   * @return {String} Retourne la description de la recette
   */
  get description() {
    return this.#description;
  }

  /**
   * Obtenir la liste des ingrédients de la recette
   * @return {Number} Retourne la liste des ingrédients de la recette
   */
  get ingredients() {
    return this.#ingredients;
  }

  /**
   * Obtenir la liste des ustensils utilisés
   * @return {Number} Retourne la liste des ustensils utilisés
   */
  get ustensils() {
    return this.#ustensils;
  }

  /**
   * Obtenir l'appareil de la recette
   * @return {Number} Retourne l'appareil de la recette
   */
  get device() {
    return this.#device;
  }

  /**
   * Obtenir les tags de la recette
   * @returns {Array<Tag>} Retourne les tags de la recette
   */
  getTags() {
    return (this.#ingredients.map((ingredient) => new Tag({
      name: ingredient.ingredient.toLowerCase(),
      type: 'ingredient'
    }))).concat(this.#ustensils.map((ustensil) => new Tag({
      name: ustensil.toLowerCase(),
      type: 'ustensil'
    }))).concat([new Tag({
      name: this.#device.toLowerCase(),
      type: 'device'
    })])
  }
}
