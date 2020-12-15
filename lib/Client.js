
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
     * Database and ORM support with Sequelize.
     */
    this.sequelize = new Sequelize(BOT_DATABASE_DSN)

    /**
     * The master collection of reductions. Reductions are per-user per-guild,
     * and include a master type ("kill"), a subtypeA ("rats"), a subtypeB,
     * and a freeform explanation ("10"). That example would read as "this
     * user in this guild has earned a reduction for killing ten giant
     * rats". Each individual reduction is always worth 1 second.
     */
    this.guildMemberReductions = this.sequelize.define('guildMemberReductions', {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'The unique ID of the Discord user.'
      },
      guildId: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'The unique ID of the Discord guild.'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'The type of reduction earned (e.g., kill, craft, explore).'
      },
      subtype: {
        type: Sequelize.STRING,
        comment: 'The subtype of reduction earned (e.g., rats, weapon, village).'
      },
      subsubtype: {
        type: Sequelize.STRING,
        comment: 'The subsubtype of reduction earned (e.g., giant, vorpalSword, outtsButte).'
      },
      explanation: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'The milestone or reason that earned the reduction (e.g., 10, 100, "Played on April 1st, 2021.")'
      }
    })

    this.sequelize.sync()
  }
}
