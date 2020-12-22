
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
   * Load all database models. Files must export a Sequelize database Model.
   * @param {null|Array} globPatterns - An array of patterns to glob against.
   * @return {LoidBotRegistry}
   */
  loadDatabaseModelsIn (globPatterns) {
    for (const globPattern of globPatterns) {
      for (const filepath of glob.sync(globPattern)) {
        require(path.join(process.cwd(), filepath))(this.sequelize, Sequelize.DataTypes)
      }
    }

    this.sequelize.sync()
    return this
  }
}
