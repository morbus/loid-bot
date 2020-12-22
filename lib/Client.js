
/**
 * Provides a CommandoClient class with logging and other initialized extras.
 */

'use strict'
const { BOT_DATABASE_DSN } = process.env
const { CommandoClient } = require('discord.js-commando')
const Sequelize = require('sequelize')
const glob = require('glob')
const path = require('path')
const winston = require('winston')

module.exports = class LoidBotClient extends CommandoClient {
  constructor (options) {
    super(options)

    /**
     * Logging support with Winston.
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
     */
    this.sequelize = new Sequelize(BOT_DATABASE_DSN, {
      logging: this.logger.verbose.bind(this.logger)
    })
  }

  /**
   * Load all database models. Files must export a Sequelize database Model.
   * @param {null|Array} globPatterns - An array of patterns to glob against.
   * @return {Promise}
   */
  loadDatabaseModelsIn (globPatterns) {
    for (const globPattern of globPatterns) {
      for (const filepath of glob.sync(globPattern)) {
        require(path.join(process.cwd(), filepath))(this.sequelize, Sequelize.DataTypes)
      }
    }

    this.sequelize.sync()
  }
}
