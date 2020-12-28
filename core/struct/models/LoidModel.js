
'use strict'
const { AkairoModule } = require('discord-akairo')

/**
 * Represents a database model.
 * @param {string} id - Model ID.
 * @param {LoidModelOptions} [options={}] - Options for the model.
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

/**
 * Options to use for database model behavior.
 * Also includes properties from AkairoModuleOptions.
 * @typedef {AkairoModuleOptions} LoidModelOptions
 * @prop {string} [modelName=''] - The name of the database model.
 * @prop {object} [attributes={}] - The ORM attributes of the database model.
 * @prop {object} [options={}] - The ORM options of the database model.
 */
