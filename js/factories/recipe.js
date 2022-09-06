/**
 * La classe Recipe
 */
class Recipe {
  #name;

  #time;

  #description;

  #ingredients;

  /**
   * Constructeur de la classe Recipe
   * @param data {Object} L'objet des données de la recette
   */
  constructor(data) {
    this.#name = data.name;
    this.#time = data.time;
    this.#description = data.description;
    this.#ingredients = data.ingredients;
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
}
