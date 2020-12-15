
/**
 * Provides a CommandoClient class with logging and other initialized extras.
 */

'use strict'
const { BOT_DATABASE_DSN } = process.env
const { CommandoClient } = require('discord.js-commando')
const Sequelize = require('sequelize')
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
     * Database and object-relational mapping (ORM) support with Sequelize.
     */
    this.sequelize = new Sequelize(BOT_DATABASE_DSN)
    this.guildMemberReductions = require('../models/guildMemberReductions.js')(this.sequelize, Sequelize.DataTypes)
    this.sequelize.sync()
  }
}
