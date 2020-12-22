
/**
 * Provides a CommandoCommand class with extras located outside the client.
 */

'use strict'
const { Command } = require('discord.js-commando')

module.exports = class LoidBotCommand extends Command {
  constructor (client, info) {
    super(client, info)

    /**
     * Logging support with Winston.
     * @type {Logger}
     */
    Object.defineProperty(this, 'logger', { value: client.logger })

    /**
     * Database and ORM support with Sequelize.
     * @type {Sequelize}
     */
    Object.defineProperty(this, 'sequelize', { value: client.sequelize })

    /**
     * Defined database models with Sequelize.
     */
    Object.defineProperty(this, 'database', { value: client.sequelize.models })
  }
}
