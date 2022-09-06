/**
 * La classe Tag
 */
class Tag {
  #name;

  #type;

  /**
   * Constructeur de la classe Tag
   * @param data {Object} L'objet des données du tag
   */
  constructor(data) {
    this.#name = data.name;
    this.#type = data.type;
  }

  /**
   * Obtenir le nom du tag
   * @return {String} Retourne le type du tag
   */
  get name() {
    return this.#name;
  }

  /**
   * Obtenir le type du tag
   * @return {String} Retourne le type du tag
   */
  get type() {
    return this.#type;
  }
}
