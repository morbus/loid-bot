
/**
 * Provides a CommandoCommand class with extras located outside the client.
 */

'use strict'
const { Command } = require('discord.js-commando')

module.exports = class LoidBotCommand extends Command {
  constructor (client, info) {
    super(client, info)

    /**
     * Support this.logger.info() instead of this.client.logger.info().
     */
    Object.defineProperty(this, 'logger', { value: client.logger })

    /**
     * Support this.sequelize instead of this.client.sequelize.
     */
    Object.defineProperty(this, 'sequelize', { value: client.sequelize })

    /**
     * Support this.database.MODEL instead of this.client.sequelize.models.MODEL.
     */
    Object.defineProperty(this, 'database', { value: client.sequelize.models })
  }
}
