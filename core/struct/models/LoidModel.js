
'use strict'
const { AkairoModule } = require('discord-akairo')

/**
 * Represents a database model.
 * @param {string} id - Model ID.
 * @param {options} options - Options for the model.
 * @param {string} options.modelName - The name of the database model.
 * @param {object} options.attributes - The ORM attributes of the database model.
 * @param {object} options.options - The ORM options of the database model.
 * @extends {AkairoModule}
 */
class LoidModel extends AkairoModule {
  constructor (id, {
    modelName = '',
    attributes = {},
    options = {}
  } = {}) {
    super(id, {})

    /**
     * The name of the database model.
     * @type {string}
     */
    this.modelName = modelName

    /**
     * The ORM attributes of the database model.
     * @type {object}
     */
    this.attributes = attributes

    /**
     * The ORM options of the database model.
     * @type {object}
     */
    this.options = options
  }
}

module.exports = LoidModel
