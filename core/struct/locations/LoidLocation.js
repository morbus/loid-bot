
'use strict'
const { AkairoError, AkairoModule } = require('discord-akairo')

/**
 * Represents a game location.
 * @param {string} id - Model ID.
 * @param {LoidLocationOptions} [options={}] - Options for the location.
 * @extends {AkairoModule}
 */
class LoidLocation extends AkairoModule {
  constructor (id, {
    locationName = '',
    description = '',
    imageUrl = ''
  } = {}) {
    super(id, {})

    /**
     * The name of the location.
     * @type {string}
     */
    this.locationName = locationName

    /**
     * A description of the location.
     * @type {string}
     */
    this.description = description

    /**
     * An image URL of the location.
     * @type {string}
     */
    this.imageUrl = imageUrl
  }

  /**
   * Return a list of mobs available at a location based on reduction level.
   * @abstract
   * @param {string} reductionType - The type of reduction level, usually 'kill'.
   * @param {float} reductionLevel - The reduction level to find available mobs for.
   * @returns {Array}
   */
  availableMobsAt (reductionType, reductionLevel) {
    throw new AkairoError('NOT_IMPLEMENTED', this.constructor.name, 'availableMobsAt')
  }
}

module.exports = LoidLocation

/**
 * Options to use for location behavior.
 * Also includes properties from AkairoModuleOptions.
 * @typedef {AkairoModuleOptions} LoidLocationOptions
 * @prop {string} [locationName=''] - The name of the location.
 * @prop {string} [description=''] - A description of the location.
 * @prop {string} [imageUrl=''] - An image URL of the location.
 */
