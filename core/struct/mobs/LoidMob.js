
'use strict'
const { AkairoModule } = require('discord-akairo')

/**
 * Represents a game mob.
 * @param {string} id - Mob ID.
 * @param {LoidMobOptions} [options={}] - Options for the mob.
 * @extends {AkairoModule}
 */
class LoidMob extends AkairoModule {
  constructor (id, {
    mobName = '',
    description = '',
    imageUrl = ''
  } = {}) {
    super(id, {})

    /**
     * The name of the mob.
     * @type {string}
     */
    this.mobName = mobName

    /**
     * A description of the mob.
     * @type {string}
     */
    this.description = description

    /**
     * An image URL of the mob.
     * @type {string}
     */
    this.imageUrl = imageUrl
  }
}

module.exports = LoidMob

/**
 * Options to use for mob behavior.
 * Also includes properties from AkairoModuleOptions.
 * @typedef {AkairoModuleOptions} LoidMobOptions
 * @prop {string} [mobName=''] - The name of the mob.
 * @prop {string} [description=''] - A description of the mob.
 * @prop {string} [imageUrl=''] - An image URL of the mob.
 */
