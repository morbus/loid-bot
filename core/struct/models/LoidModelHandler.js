
'use strict'
const { AkairoError, AkairoHandler } = require('discord-akairo')
const LoidModel = require('./LoidModel')

/**
 * Loads database model definitions.
 * @param {AkairoClient} client - The Akairo client.
 * @param {AkairoHandlerOptions} options - Options for the model handler.
 * @extends {AkairoHandler}
 */
class LoidModelHandler extends AkairoHandler {
  constructor (client, {
    classToHandle = LoidModel
  } = {}) {
    if (!(classToHandle.prototype instanceof LoidModel || classToHandle === LoidModel)) {
      throw new AkairoError('INVALID_CLASS_TO_HANDLE', classToHandle.name, LoidModel.name)
    }

    super(client, {
      classToHandle
    })
  }

  /**
   * Loads a model, can be a module class or a filepath.
   * @param {string|Function} thing - Module class or path to module.
   * @param {boolean} [isReload=false] - Whether this is a reload or not.
   * @returns {AkairoModule}
   */
  load (thing, isReload = false) {
    const model = super.load(thing, isReload)
    this.client.sequelize.define(model.modelName, model.attributes, model.options).sync()
    return model
  }
}

module.exports = LoidModelHandler
