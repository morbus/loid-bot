
'use strict'
const { AkairoClient, CommandHandler } = require('discord-akairo')
const { BOT_COMMAND_PREFIX, BOT_DATABASE_DSN, BOT_OWNER_USERID } = process.env
const LoidLocationHandler = require('./locations/LoidLocationHandler')
const LoidMobHandler = require('./mobs/LoidMobHandler')
const LoidModelHandler = require('./models/LoidModelHandler')
const Sequelize = require('sequelize')
const glob = require('glob')
const path = require('path')
const winston = require('winston')

/**
 * The LOID framework client.
 * @param {AkairoOptions} [options={}] - Options for the Akairo client.
 * @param {ClientOptions} [clientOptions] - Options for Discord JS client.
 * @extends {AkairoClient}
 */
class LoidClient extends AkairoClient {
  constructor () {
    super({
      ownerID: BOT_OWNER_USERID
    })

    /**
     * Akairo's CommandHandler.
     * @see loadAddonCommandsIn()
     * @type {module:discord-akairo.CommandHandler}
     */
    this.commandHandler = new CommandHandler(this, {
      commandUtil: true,
      prefix: BOT_COMMAND_PREFIX
    })

    /**
     * LOID's LocationHandler.
     * @see loadAddonLocationsIn()
     * @type {LoidModelHandler}
     */
    this.locationHandler = new LoidLocationHandler(this)

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
     * LOID's MobHandler.
     * @see loadAddonMobsIn()
     * @type {LoidModelHandler}
     */
    this.mobHandler = new LoidMobHandler(this)

    /**
     * LOID's database ModelHandler.
     * @see loadAddonModelsIn()
     * @type {LoidModelHandler}
     */
    this.modelHandler = new LoidModelHandler(this)

    /**
     * Database support with Sequelize.
     * @type {Sequelize}
     */
    this.sequelize = new Sequelize(BOT_DATABASE_DSN, {
      logging: this.logger.verbose.bind(this.logger)
    })

    /**
     * Listen for loggable events and log with Winston.
     */
    this.on('error', message => this.logger.error(message))
    this.on('warn', message => this.logger.warn(message))
    this.on('debug', message => this.logger.debug(message))
  }

  /**
   * Load addon files in the passed directories.
   * @param {Array} directories - An array of directories to glob through.
   * @return {LoidClient}
   */
  loadAddonsIn (directories) {
    this.loadAddonCommandsIn(directories)
    this.loadAddonLocationsIn(directories)
    this.loadAddonMobsIn(directories)
    this.loadAddonModelsIn(directories)
    return this
  }

  /**
   * Load addon *.command.js files in the passed directories.
   * @param {Array} directories - The directories to search through.
   * @return {LoidClient}
   */
  loadAddonCommandsIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/*.command.js')
      this.logger.debug(`Looking for addon commands in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        this.logger.info(`Loading addon command ${filepath}.`)
        const command = this.commandHandler.load(filepath)

        if (typeof command.addArgumentTypes === 'function') {
          this.logger.info(`Loading addon argument types for ${filepath}.`)
          command.addArgumentTypes()
        }
      }
    }

    return this
  }

  /**
   * Load addon *.location.js files in the passed directories.
   * @param {Array} directories - The directories to search through.
   * @return {LoidClient}
   */
  loadAddonLocationsIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/*.location.js')
      this.logger.debug(`Looking for addon locations in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        this.logger.info(`Loading addon location ${filepath}.`)
        this.locationHandler.load(filepath)
      }
    }

    return this
  }

  /**
   * Load addon *.mob.js files in the passed directories.
   * @param {Array} directories - The directories to search through.
   * @return {LoidClient}
   */
  loadAddonMobsIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/*.mob.js')
      this.logger.debug(`Looking for addon mobs in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        this.logger.info(`Loading addon mob ${filepath}.`)
        this.mobHandler.load(filepath)
      }
    }

    return this
  }

  /**
   * Load addon *.model.js files in the passed directories.
   * @param {Array} directories - The directories to search through.
   * @return {LoidClient}
   */
  loadAddonModelsIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/*.model.js')
      this.logger.debug(`Looking for addon models in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        this.logger.info(`Loading addon model ${filepath}.`)
        this.modelHandler.load(filepath)
      }
    }

    return this
  }
}

module.exports = LoidClient
