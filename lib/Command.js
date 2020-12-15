
/**
 * Provides a CommandoCommand class with extras located outside the client.
 */

'use strict'
const { Command } = require('discord.js-commando')

module.exports = class LoidBotCommandoCommand extends Command {
  constructor (client, info) {
    super(client, info)

    /**
     * Allow this.logger.info() instead of this.client.logger.info().
     *
     * @type {winston.Logger}
     * @readonly
     */
    Object.defineProperty(this, 'logger', { value: client.logger })
  }
}
