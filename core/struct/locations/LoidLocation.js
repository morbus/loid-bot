
'use strict'
const { AkairoModule } = require('discord-akairo')

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
