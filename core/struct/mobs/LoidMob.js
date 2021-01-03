
'use strict'
const { AkairoError, AkairoModule } = require('discord-akairo')

/**
 * Represents a game mob.
 * @param {string} id - Mob ID.
 * @param {options} options - Options for the mob.
 * @param {string} options.mobName - The name of the mob.
 * @param {string} options.description - A description of the mob.
 * @param {string} options.imageUrl - An image URL of the mob.
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

  /**
   * Define durations for a mob.
   * @abstract
   * @param {string} reductionType - The type of reduction level.
   * @param {float} reductionLevel - The amount of reduction level.
   * @param {Discord.Guild} guild - The guild this request is from.
   * @param {Discord.User} user - The user this request is for.
   * @return {object} duration - An object with 'seconds', 'minutes', etc.
   */
  durationAt (reductionType, reductionLevel, guild, user) {
    throw new AkairoError('NOT_IMPLEMENTED', this.constructor.name, 'durationAt')
  }

  /**
   * Return a duration object for a mob.
   * @param {string} reductionType - The type of reduction level.
   * @param {float} reductionLevel - The amount of reduction level.
   * @param {Discord.Guild} guild - The guild this request is from.
   * @param {Discord.User} user - The user this request is for.
   * @return {object} duration - An object with 'seconds', 'minutes', etc.
   */
  getDurationAt (reductionType, reductionLevel, guild, user) {
    return this.durationAt(reductionType, reductionLevel, guild, user)
  }
}

module.exports = LoidMob
