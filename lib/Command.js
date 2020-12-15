
/**
 * Provides a CommandoCommand class with extras located outside the client.
 */

'use strict'
const { Command } = require('discord.js-commando')

module.exports = class LoidBotCommandoCommand extends Command {
  constructor (client, info) {
    super(client, info)

    /**
     * Support this.logger.info() instead of this.client.logger.info().
     */
    Object.defineProperty(this, 'logger', { value: client.logger })

    /**
     * Support sequelize and our database models one level up too.
     */
    Object.defineProperty(this, 'sequelize', { value: client.sequelize })
    Object.defineProperty(this, 'guildMemberReductions', { value: client.guildMemberReductions })
  }
}
