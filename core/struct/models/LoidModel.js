
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
    super(id, { })

    /**
     * The database model name.
     * @type {string}
     */
    this.modelName = modelName

    /**
     * The database model attributes.
     * @type {object}
     */
    this.attributes = attributes

    /**
     * The database model options.
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
 * @prop {string} [modelName=''] - The database model name.
 * @prop {object} [attributes={}] - The database model attributes.
 * @prop {object} [options={}] - The database model options.
 */
