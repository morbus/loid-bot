
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

module.exports = class LoidBotCommandoClient extends CommandoClient {
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
     * Load all database models from core and user.
     */
    this.sequelize = new Sequelize(BOT_DATABASE_DSN, {
      logging: this.logger.verbose.bind(this.logger)
    })

    const modelFilePatterns = [
      'core/**/models/**/*.js',
      'igms/**/models/**/*.js'
    ]
    for (const modelFilePattern of modelFilePatterns) {
      for (const modelFilepath of glob.sync(modelFilePattern)) {
        require(path.join(process.cwd(), modelFilepath))(this.sequelize, Sequelize.DataTypes)
      }
    }

    this.sequelize.sync()
  }
}
