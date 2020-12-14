
/**
 * Provides a CommandoClient class with logging and other extras.
 *
 * @extends CommandoClient
 */

'use strict'
const { CommandoClient } = require('discord.js-commando')
const winston = require('winston')

module.exports = class LoidBotCommandoClient extends CommandoClient {
  /**
   * @inheritDoc
   */
  constructor (options) {
    super(options)

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(log => `[${log.level.toUpperCase()}] [${log.timestamp}] ${log.message}`)
      )
    })
  }
}
