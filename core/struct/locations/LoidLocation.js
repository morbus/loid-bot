
'use strict'
const { AkairoError, AkairoModule } = require('discord-akairo')

/**
 * Represents a game location.
 * @param {string} id - Location ID.
 * @param {options} options - Options for the location.
 * @param {string} options.locationName - The name of the location.
 * @param {string} options.description - A description of the location.
 * @param {string} options.imageUrl - An image URL of the location.
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
   * Define mobs available at a location based on reduction level.
   * @abstract
   * @param {string} reductionType - The type of reduction level.
   * @param {float} reductionLevel - The amount of reduction level.
   * @param {Guild} guild - The guild this request is from.
   * @param {User} user - The user this request is for.
   * @returns {string[]} mobs - Mobs available at this reduction level.
   */
  availableMobsAt (reductionType, reductionLevel, guild, user) {
    throw new AkairoError('NOT_IMPLEMENTED', this.constructor.name, 'availableMobsAt')
  }

  /**
   * Return mobs available at a location based on reduction level.
   * @param {string} reductionType - The type of reduction level.
   * @param {float} reductionLevel - The amount of reduction level.
   * @param {Guild} guild - The guild this request is from.
   * @param {User} user - The user this request is for.
   * @returns {string[]} mobs - Mobs available at this reduction level.
   */
  getAvailableMobsAt (reductionType, reductionLevel, guild, user) {
    return this.availableMobsAt(reductionType, reductionLevel, guild, user)
  }
}

module.exports = LoidLocation
