
'use strict'
const { AkairoError, AkairoHandler } = require('discord-akairo')
const LoidMob = require('./LoidMob')

/**
 * Loads game mobs.
 * @param {AkairoClient} client - The Akairo client.
 * @param {AkairoHandlerOptions} options - Options for the mob handler.
 * @extends {AkairoHandler}
 */
class LoidMobHandler extends AkairoHandler {
  constructor (client, {
    classToHandle = LoidMob
  } = {}) {
    if (!(classToHandle.prototype instanceof LoidMob || classToHandle === LoidMob)) {
      throw new AkairoError('INVALID_CLASS_TO_HANDLE', classToHandle.name, LoidMob.name)
    }

    super(client, {
      classToHandle
    })
  }
}

module.exports = LoidMobHandler
