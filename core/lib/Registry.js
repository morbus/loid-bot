
/**
 * Discord.js Commando Registry with LOID functionality.
 * @extends {CommandoRegistry}
 */

'use strict'
const { CommandoRegistry } = require('discord.js-commando')
const Sequelize = require('sequelize')
const discord = require('discord.js')
const glob = require('glob')
const path = require('path')

module.exports = class LoidBotRegistry extends CommandoRegistry {
  /**
   * @inheritDoc
   */
  constructor (client) {
    super(client)

    /**
     * Registered locations, mapped by their name.
     * @type {Collection<string, Object>}
     */
    this.locations = new discord.Collection()

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
  }

  /**
   * Register all addon files in the passed directories.
   * @param {Array} directories - An array of directories to search through.
   * @return {LoidBotRegistry}
   */
  registerAddonsIn (directories) {
    this.registerAddonListenersIn(directories)
    this.registerAddonLocationsIn(directories)
    this.registerAddonModelsIn(directories)
    this.registerAddonTypesIn(directories)

    return this
  }

  /**
   * Register addon listeners in the passed directories.
   * @param {Array} directories - An array of directories to search through.
   * @return {LoidBotRegistry}
   */
  registerAddonListenersIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/*.js')
      const options = { ignore: ['/**/models/**/*', '/**/types/**/*'] }
      this.logger.debug(`Looking for addon listeners in ${pattern}.`)

      for (const filepath of glob.sync(pattern, options)) {
        this.registerCommand(require(filepath))
        this.logger.info(`Loaded addon listener in ${filepath}.`)
      }
    }

    return this
  }

  /**
   * Register addon locations in the passed directories.
   * @param {Array} directories - An array of directories to search through.
   * @return {LoidBotRegistry}
   */
  registerAddonLocationsIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/locations/**/*.json')
      this.logger.debug(`Looking for addon locations in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        const location = require(filepath)
        this.locations.set(location.name, location)
        this.logger.info(`Loaded addon location in ${filepath}.`)
      }
    }

    return this
  }

  /**
   * Register addon database models in the passed directories.
   * @param {Array} directories - An array of directories to search through.
   * @return {LoidBotRegistry}
   */
  registerAddonModelsIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/models/**/*.js')
      this.logger.debug(`Looking for addon models in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        require(filepath)(this.sequelize, Sequelize.DataTypes)
        this.logger.info(`Loaded addon model in ${filepath}.`)
      }
    }

    this.sequelize.sync()
    return this
  }

  /**
   * Register addon argument types in the passed directories.
   * @param {Array} directories - An array of directories to search through.
   * @return {LoidBotRegistry}
   */
  registerAddonTypesIn (directories) {
    for (const directory of directories) {
      const pattern = path.join(directory, '/**/types/**/*.js')
      this.logger.debug(`Looking for addon types in ${pattern}.`)

      for (const filepath of glob.sync(pattern)) {
        this.registerType(require(filepath))
        this.logger.info(`Loaded addon type in ${filepath}.`)
      }
    }

    return this
  }
}
