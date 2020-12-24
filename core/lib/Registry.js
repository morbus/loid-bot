
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
   *
   * An addon directory can look like the following:
   *   addonName/commandName.js
   *   addonName/commandNameAlso.js
   *   addonName/assets/images/someImage.png
   *   addonName/assets/locations/locationName.png
   *   addonName/assets/mobs/mobName.json
   *   addonName/models/tableName.js
   *   addonName/types/typeName.js
   *
   * @param {Array} directories - An array of directories to search through.
   * @return {LoidBotRegistry}
   */
  registerAddonsIn (directories) {
    this.registerAddonModelsIn(directories)
    this.registerAddonTypesIn(directories)
    this.registerAddonListenersIn(directories)
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
        this.logger.info(`Loading addon listener in ${filepath}.`)
        this.registerCommand(require(filepath))
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
        this.logger.info(`Loading addon model in ${filepath}.`)
        require(filepath)(this.sequelize, Sequelize.DataTypes)
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
        this.logger.info(`Loading addon type in ${filepath}.`)
        this.registerType(require(filepath))
      }
    }

    return this
  }
}
