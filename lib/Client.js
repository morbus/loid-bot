
/**
 * Provides a CommandoClient class with logging and other initialized extras.
 */

'use strict'
const { CommandoClient } = require('discord.js-commando')
const winston = require('winston')

module.exports = class LoidBotCommandoClient extends CommandoClient {
  constructor (options) {
    super(options)

    /**
     * @type {winston.Logger}
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
  }
}
