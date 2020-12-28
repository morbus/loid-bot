
'use strict'
const { AkairoError, AkairoHandler } = require('discord-akairo')
const LoidLocation = require('./LoidLocation')

/**
 * Loads game locations.
 * @param {AkairoClient} client - The Akairo client.
 * @param {AkairoHandlerOptions} options - Options for the location handler.
 * @extends {AkairoHandler}
 */
class LoidLocationHandler extends AkairoHandler {
  constructor (client, {
    classToHandle = LoidLocation
  } = {}) {
    if (!(classToHandle.prototype instanceof LoidLocation || classToHandle === LoidLocation)) {
      throw new AkairoError('INVALID_CLASS_TO_HANDLE', classToHandle.name, LoidLocation.name)
    }

    super(client, {
      classToHandle
    })
  }
}

module.exports = LoidLocationHandler
