
/**
 * Discord.js Client with Commando and LOID functionality.
 * @extends {CommandoClient}
 */

'use strict'
const { BOT_DATABASE_DSN } = process.env
const { CommandoClient } = require('discord.js-commando')
const LoidBotRegistry = require('../../core/lib/Registry')
const Sequelize = require('sequelize')
const winston = require('winston')

// @todo I can't figure out any other way to make this work.
const CommandDispatcher = require('../../node_modules/discord.js-commando/src/dispatcher')

module.exports = class LoidBotClient extends CommandoClient {
  /**
   * @inheritDoc
   */
  constructor (options) {
    super(options)

    /**
     * Logging support with Winston.
     * @type {Logger}
     */
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({ level: 'debug' })
      ],
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(log => `[${log.level.toUpperCase()}] [${log.timestamp}] ${log.message}`),
        winston.format.colorize({ all: true })
      )
    })

    /**
     * Database and ORM support with Sequelize.
     * @type {Sequelize}
     */
    this.sequelize = new Sequelize(BOT_DATABASE_DSN, {
      logging: this.logger.verbose.bind(this.logger)
    })

    /**
     * LOID's replacement {CommandoRegistry}.
     * @type {LoidBotRegistry}
     */
    this.registry = new LoidBotRegistry(this)
    this.dispatcher = new CommandDispatcher(this, this.registry)
  }
}
