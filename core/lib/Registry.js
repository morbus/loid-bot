
/**
 * Discord.js Commando Registry with LOID functionality.
 * @extends {CommandoRegistry}
 */

'use strict'
const { CommandoRegistry } = require('discord.js-commando')
const Sequelize = require('sequelize')
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
   * Register addons in the core and user spaces.
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
    const addonTypes = [
      {
        type: 'model',
        pattern: '/**/models/**/*.js'
      },
      {
        type: 'type',
        pattern: '/**/types/**/*.js'
      },
      {
        type: 'file',
        pattern: '/**/*.js',
        options: {
          ignore: [
            '/**/models/**/*',
            '/**/types/**/*'
          ]
        }
      }
    ]

    for (const directory of directories) {
      for (const addonType of addonTypes) {
        const options = addonType.options || {}
        const pattern = path.join(directory, addonType.pattern)
        this.logger.debug(`Looking for addon ${addonType.type}s in ${pattern}.`)

        for (const filepath of glob.sync(pattern, options)) {
          this.logger.info(`Loading addon ${addonType.type} in ${filepath}.`)

          if (addonType.type === 'model') {
            require(filepath)(this.sequelize, Sequelize.DataTypes)
          }

          if (addonType.type === 'type') {
            this.registerType(require(filepath))
          }

          if (addonType.type === 'file') {
            this.registerCommand(require(filepath))
          }
        }
      }
    }

    this.sequelize.sync()
    return this
  }
}
